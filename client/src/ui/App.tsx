import React from 'react';
import ChatContext, { ChatContextValue, ChatContextProvider } from 'contexts/chat';
import Main from 'ui/Main';

const App = (): JSX.Element => (
  <ChatContextProvider>
    <Main />
  </ChatContextProvider>
);

export default App;
