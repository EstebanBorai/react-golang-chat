package chat

import (
	"bytes"
	"encoding/json"
	"net"
	"sort"
	"sync"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
)

type Chat struct {
	mut           sync.RWMutex
	seq           uint
	userConnSlice []*UserConnection
	userConnMap   map[string]*UserConnection

	pool *Pool
	out  chan []byte
}

func NewChat(pool *Pool) *Chat {
	var chat *Chat = new(Chat)

	chat.pool = pool
	chat.userConnMap = make(map[string]*UserConnection)
	chat.out = make(chan []byte, 1)

	go chat.writer()

	return chat
}

func (c *Chat) Register(conn net.Conn) *UserConnection {
	var userName string = "sarlanga"
	var userConn *UserConnection = new(UserConnection)

	userConn.user.chat = c
	userConn.conn = conn

	c.mut.Lock()
	{

		userConn.user.id = c.seq
		userConn.user.name = "sarla"

		c.userConnSlice = append(c.userConnSlice, userConn)
		c.userConnMap[userName] = userConn

		c.seq++
	}
	c.mut.Unlock()

	userConn.writeNotice("Welcome to the chat!", Object{
		"name": userName,
	})

	c.Broadcast("greet", Object{
		"name": userName,
		"time": NewTimestamp(),
	})

	return userConn
}

func (c *Chat) Remove(userConn *UserConnection) {
	c.mut.Lock()
	removed := c.remove(userConn)
	c.mut.Unlock()

	if !removed {
		return
	}

	c.Broadcast("goodbye", Object{
		"name": userConn.user.name,
		"time": NewTimestamp(),
	})
}

func (c *Chat) Rename(userConn *UserConnection, name string) (prev string, ok bool) {
	c.mut.Lock()
	{
		if _, has := c.userConnMap[name]; !has {
			ok = true
			prev, userConn.user.name = userConn.user.name, name

			delete(c.userConnMap, prev)
			c.userConnMap[name] = userConn
		}
	}
	c.mut.Unlock()

	return prev, ok
}

func (c *Chat) Broadcast(method string, params Object) error {
	var buf bytes.Buffer

	w := wsutil.NewWriter(&buf, ws.StateServerSide, ws.OpText)
	encoder := json.NewEncoder(w)

	r := Request{
		Method: method,
		Params: params,
	}

	if err := encoder.Encode(r); err != nil {
		return err
	}

	if err := w.Flush(); err != nil {
		return err
	}

	c.out <- buf.Bytes()

	return nil
}

func (c *Chat) writer() {
	for bts := range c.out {
		c.mut.RLock()
		userList := c.userConnSlice
		c.mut.RUnlock()

		for _, u := range userList {
			u := u
			c.pool.Schedule(func() {
				u.writeBytes(bts)
			})
		}
	}
}

func (c *Chat) remove(userConn *UserConnection) bool {
	if _, has := c.userConnMap[userConn.user.name]; !has {
		return false
	}

	delete(c.userConnMap, userConn.user.name)

	i := sort.Search(len(c.userConnSlice), func(i int) bool {
		return c.userConnSlice[i].user.id >= userConn.user.id
	})

	if i >= len(c.userConnSlice) {
		panic("Chat: Incosistent State")
	}

	without := make([]*UserConnection, len(c.userConnSlice)-1)

	copy(without[:i], c.userConnSlice[:i])
	copy(without[i:], c.userConnSlice[i+1:])

	c.userConnSlice = without

	return true
}
