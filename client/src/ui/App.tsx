import React from 'react';
import Main from 'ui/Main';
import { ChatContextProvider } from '../contexts/chat';
import ChatService from '../services/ChatService';

const App = (): JSX.Element => {
  const chatService = new ChatService();

  return (
    <ChatContextProvider service={chatService}>
      <Main />
    </ChatContextProvider>
  )
}

export default App;
