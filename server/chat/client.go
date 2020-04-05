package chat

// Client represents a chat client
type Client struct {
	Username string
}

// NewClient creates an instance of a client
// and return a pointer
func NewClient(username string) *Client {
	var client *Client = new(Client)

	client.Username = username

	return client
}
