import React from 'react';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export interface Message {
  author: string;
  message: string;
}

export interface ChatContextValue {
  socket: WebSocketSubject<Message>;
  author?: string;
  messages: Message[];
  error?: string;
  isOver: boolean;
  join: (username: string) => void;
  send: (message: string) => void;
}

export interface ChatContextProps {
  children: JSX.Element | JSX.Element[];
}

export interface ChatContextState {
  socket: WebSocketSubject<Message>;
  messages: Message[];
  error?: string;
  isOver: boolean;
  author: string;
}

const intialContext: ChatContextValue = {
  messages: [],
  author: '',
  error: null,
  isOver: false,
  join: null,
  send: null,
}

const ChatContext = React.createContext<ChatContextValue>(intialContext);

ChatContext.displayName = 'ChatContext';

export const ChatContextProvider = (props: unknown): React.Context<ChatContextValue> => {
  const [context, setContext] = React.useState<ChatContextState>({
    socket: null,
    messages: [],
    error: null,
    isOver: false,
    author: ''
  });

  const handleReceiveMessage = (message: Message): void => {
    setContext({
      ...context,
      messages: [...context.messages, message]
    });
  }

  const handleError = (err: string): void => {
    setContext({
      ...context,
      error: err,
    });
  }

  const handleCompletion = (): void => {
    setContext({
      ...context,
      isOver: true
    });
  }

  const join = (username: string): void => {
    let skt = webSocket('ws://127.0.0.1:8000/ws');

    skt.subscribe(
      handleReceiveMessage,
      handleError,
      handleCompletion
    );

    const multiplexSession = skt.multiplex(
      () => ({ subscribe: username }),
      () => ({ unsubscribe: username }),
      (message: Message) => handleReceiveMessage(message)
    );

    setContext({
      ...context,
      socket: skt,
      isOver: false,
      author: username,
    });
  }

  const send = (message: string): void => {
    context.socket.next({
      author: context.author,
      message
    });
  }

  return (
    <ChatContext.Provider value={{
      ...context,
      join,
      send
    }}>
      {
        props.children
      }
    </ChatContext.Provider>
  );
}

export const ChatContextConsumer = ChatContext.Consumer;

export default ChatContext;
