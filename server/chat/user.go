package chat

import (
	"encoding/json"
	"fmt"
	"io"
	"sync"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
)

// User represents user/chat related properties
type User struct {
	id   uint
	name string
	chat *Chat
}

// UserConnection represents the connection of the user
// and implements `send`/`receive` messages
type UserConnection struct {
	io   sync.Mutex
	conn io.ReadWriteCloser

	user *User
}

func (u *UserConnection) write(values interface{}) error {
	w := wsutil.NewWriter(u.conn, ws.StateServerSide, ws.OpText)
	encoder := json.NewEncoder(w)

	u.io.Lock()
	defer u.io.Unlock()

	if err := encoder.Encode(values); err != nil {
		return err
	}

	return w.Flush()
}

func (u *UserConnection) writeError(req *Request, err Object) error {
	return u.write(Error{
		ID:    req.ID,
		Error: err,
	})
}

func (u *UserConnection) writeResult(req *Request, result Object) error {
	return u.write(Response{
		ID:     req.ID,
		Result: result,
	})
}

func (u *UserConnection) writeNotice(method string, params Object) error {
	return u.write(Request{
		Method: method,
		Params: params,
	})
}

func (u *UserConnection) writeBytes(b []byte) error {
	u.io.Lock()
	defer u.io.Unlock()

	_, err := u.conn.Write(b)

	return err
}

func (u *UserConnection) handleRequest() (*Request, error) {
	// Locks mutex to avoid races
	u.io.Lock()

	// Will release mutex when
	// the function terminates
	defer u.io.Unlock()

	header, reader, err := wsutil.NextReader(u.conn, ws.StateServerSide)

	if err != nil {
		return nil, err
	}

	if header.OpCode.IsControl() {
		return nil, wsutil.ControlFrameHandler(u.conn, ws.StateServerSide)(header, reader)
	}

	req := &Request{}
	decoder := json.NewDecoder(reader)

	if err := decoder.Decode(req); err != nil {
		return nil, err
	}

	return req, nil
}

// Receive reads the next message from the connection
func (u *UserConnection) Receive() error {
	req, err := u.handleRequest()

	if err != nil {
		u.conn.Close()
		return err
	}

	if req == nil {
		// Is a control message
		// returns nil as this is not
		// an user message
		return nil
	}

	switch req.Method {
	case "rename":
		name, ok := req.Params["name"].(string)

		if !ok {
			return u.writeError(req, Object{
				"error": "invalid parameters",
			})
		}

		prev, ok := u.user.chat.Rename(u, name)
		if !ok {
			return u.writeError(req, Object{
				"error": fmt.Sprintf("A chat with name \"%s\" already exists", name),
			})
		}

		u.user.chat.Broadcast("rename", Object{
			"prev": prev,
			"name": name,
			"time": NewTimestamp(),
		})

		return u.writeResult(req, nil)

	case "publish":
		req.Params["author"] = u.user.name
		req.Params["time"] = NewTimestamp()

		u.user.chat.Broadcast("publish", req.Params)

	default:
		return u.writeError(req, Object{
			"error": fmt.Sprintf("No handler for \"%s\"", req.Method),
		})
	}

	return nil
}
