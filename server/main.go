package main

import (
	"log"
	"net"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
)

func main() {
	// CONN_TYPE represents "tcp" the type of
	// connection used by web sockets
	const CONN_TYPE string = "tcp"

	listener, err := net.Listen(CONN_TYPE, ":5200")

	if err != nil {
		log.Fatal(err)
	}

	conn, err := listener.Accept()

	upgrader := ws.Upgrader{}

	if _, err := upgrader.Upgrade(conn); err != nil {
		log.Fatal(err)
	}

	// for {
	// 	reader := wsutil.NewReader(conn, ws.StateServerSide)

	// 	_, err := reader.NextFrame()

	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}

	// 	data, err := ioutil.ReadAll(reader)

	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}

	// 	log.Println(string(data))
	// }

	if err := wsutil.WriteServerText(conn, []byte("Hello from gobwas/ws!")); err != nil {
		log.Fatal(err)
	}
}
