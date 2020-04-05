package chat

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Options represents available
// options for a chat instance
type Options struct {
	logger bool
}

// Chat represtents a chat
// instance
type Chat struct {
	clients   map[*websocket.Conn]*Client
	broadcast chan Message
	upgrader  *websocket.Upgrader
	options   *Options
}

// NewChatOptions creates a new Options instance
// and returns a pointer to it
func NewChatOptions(logger bool) *Options {
	var options *Options = new(Options)

	options.logger = logger

	return options
}

// NewChat creates a new chat instance and returns a
// pointer to it
func NewChat(options *Options) *Chat {
	var chat *Chat = new(Chat)
	chat.options = options
	var upgrader *websocket.Upgrader = new(websocket.Upgrader)

	upgrader.CheckOrigin = func(r *http.Request) bool {
		// Allows connections from any origin
		return true
	}

	chat.clients = make(map[*websocket.Conn]*Client)
	chat.upgrader = upgrader

	go chat.handleMessages()

	return chat
}

// Broadcast received messages to clients
func (chat *Chat) handleMessages() {
	message := <-chat.broadcast

	if chat.options != nil && chat.options.logger {
		log.Printf("Received message:\t%v\n", message)
	}

	for client := range chat.clients {
		err := client.WriteJSON(message)

		if err != nil {
			if chat.options != nil && chat.options.logger {
				log.Printf("Error occurred broadcasting message:\t%v\n", err)
			}

			client.Close()
			delete(chat.clients, client)
		}
	}
}

func (chat *Chat) handleRequests() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ws, err := chat.upgrader.Upgrade(w, r, nil)

		if err != nil {
			if chat.options != nil && chat.options.logger {
				log.Printf("Error occurred upgrading connection:\t%v\n", err)
			}

			panic(err)
		}

		defer ws.Close()

		chat.clients[ws] = NewClient("foo")

		if chat.options != nil && chat.options.logger {
			log.Printf("Register a new client:\t%v\n", chat.clients[ws])
		}

		for {
			var message Message

			err := ws.ReadJSON(&message)

			if err != nil {
				// When an error happens during the process of
				// the connection the current connection will be closed
				// and removed from the clients map
				if chat.options != nil && chat.options.logger {
					log.Printf("Removing client:\t%v\n", chat.clients[ws])
				}

				delete(chat.clients, ws)
				break
			}

			// Sends the message to the chat clients
			chat.broadcast <- message
		}
	}
}

// Serve creates an http server with an upgrader route
func (chat *Chat) Serve(port string) error {
	server := new(http.Server)
	server.Addr = port
	server.Handler = chat.handleRequests()

	if chat.options != nil && chat.options.logger {
		log.Printf("Chat is running at http://127.0.0.1:%s\n", port)
	}

	return server.ListenAndServe()
}

// GetUpgrader retrieve th handler function for the chat instance
func (chat *Chat) GetUpgrader() http.HandlerFunc {
	return chat.handleRequests()
}
