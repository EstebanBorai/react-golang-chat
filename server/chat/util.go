package chat

import "time"

type Object map[string]interface{}

type Request struct {
	ID     uint   `json:"id"`
	Method string `json:"method"`
	Params Object `json:"params"`
}

type Response struct {
	ID     uint   `json:"id"`
	Result Object `json:"result"`
}

type Error struct {
	ID    uint   `json:"id"`
	Error Object `json:"error"`
}

func NewTimestamp() int64 {
	return time.Now().UnixNano() / int64(time.Millisecond)
}
