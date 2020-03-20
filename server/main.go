package main

import (
	"github.com/estebanborai/simple-ws-in-go/server/config"
	"github.com/estebanborai/simple-ws-in-go/server/websocket"
)

func main() {
	conf := config.MustReadConfig()

	websocket.Serve(conf)
}
