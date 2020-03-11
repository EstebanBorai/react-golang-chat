import * as React from 'react';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import Chat from './Chat';
import Login from './Login';

export interface Message {
  author: string;
  message: string;
}

export interface Session {
  username: string;
  session: Observable<any>;
  socket: WebSocketSubject<Message>;
}

const App = (): JSX.Element => {
  const [session, setSession] = React.useState({
    username: null,
    session: null,
    socket: null
  });

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [error, setError] = React.useState(null);
  const [isDone, setDone] = React.useState(false);

  const socket: WebSocketSubject<Message> = webSocket('ws://127.0.0.1:5200');

  const handleNewMessage = (message: Message): boolean => {
    setMessages([...messages, message]);

    return true;
  }

  const handleError =  (err: string): void => {
    setError(err);
  }

  const handleCompletion = (): void => {
    setDone(true);
  }

  const handleConnect = async (username: string): Promise<void> => {
    socket.subscribe(
      handleNewMessage,
      handleError,
      handleCompletion
    );

    const newSession = socket.multiplex(
      () => ({ subscribe: username }),
      () => ({ unsubscribe: username }),
      handleNewMessage
    );

    setSession({
      ...session,
      username,
      session: newSession,
      socket
    });
  }

  if (session && session.socket) {
    return <Chat session={session} messages={messages} />
  }

  return <Login onSubmit={handleConnect} />
}

export default App;
