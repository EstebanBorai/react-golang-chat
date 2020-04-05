package main

import (
	"github.com/estebanborai/simple-ws-in-go/server/chat"
)

func main() {
	opts := chat.NewChatOptions(true)
	ct := chat.NewChat(opts)

	ct.Serve(":8000")
}
