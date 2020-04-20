import { Author, Message } from '../types/index';

class ChatService {
  private ws: WebSocket | undefined;
  private me: Author;

  constructor(author: Author) {
    this.ws = undefined;
    this.me = author;
  }

  public async init() {
    const { WEB_SOCKET_HOST } = process.env;

    this.ws = new WebSocket(WEB_SOCKET_HOST);
  }
}

export default ChatService;
