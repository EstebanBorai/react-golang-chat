import { BehaviorSubject } from 'rxjs';
import { Author, Message } from '../types/index';

type Messages = Message[];

class ChatService {
  private ws: WebSocket | undefined;
  private messages: Messages;
  private me: Author;
  private messagesSubject: BehaviorSubject<Messages>;
}

export default ChatService;
