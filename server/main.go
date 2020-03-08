package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
)

// Port represents the port to publish
// the WebSocket
const Port = 5200

// ConnType represents "tcp" the type of
// connection used by web sockets
const ConnType string = "tcp"

func main() {
	fmt.Printf("Running @ ws://localhost:%d\n", Port)
	listener, err := net.Listen(ConnType, ":5200")

	if err != nil {
		log.Fatal(err)
	}

	conn, err := listener.Accept()

	upgrader := ws.Upgrader{}

	if _, err := upgrader.Upgrade(conn); err != nil {
		log.Fatal(err)
	}

	for {
		reader := wsutil.NewReader(conn, ws.StateServerSide)

		_, err := reader.NextFrame()

		if err != nil {
			log.Fatal(err)
		}

		data, err := ioutil.ReadAll(reader)

		if err != nil {
			log.Fatal(err)
		}

		// log.Println(string(data))
		message := string(data)
		log.Printf("Received Message: %s\n", message)
		wsutil.WriteServerText(conn, []byte(message))
	}
}
