package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	Author  string `json:"author"`
	Message string `json:"message"`
}

func main() {
	server := http.FileServer(http.Dir("../client/dist"))
	http.Handle("/", server)
	http.HandleFunc("/ws", handleConnections)

	go handleMessages()

	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)

	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Fatal(err)
	}

	defer ws.Close()

	clients[ws] = true

	for {
		var msg Message

		err := ws.ReadJSON(&msg)

		if err != nil {
			log.Printf("error: %v", err)
			// Remove client from cliens map
			delete(clients, ws)

			break
		}

		// Send message to broadcast channel
		broadcast <- msg
	}
}

func handleMessages() {
	msg := <-broadcast

	for client := range clients {
		err := client.WriteJSON(msg)
		log.Printf("%v\n", msg)
		if err != nil {
			log.Printf("error: %v", err)
			client.Close()
			delete(clients, client)
		}
	}
}
