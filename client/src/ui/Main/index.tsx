import React from 'react';
import Login from 'ui/Login';
import Chat from 'ui/Chat';
import ChatContext, { ChatContextValue } from 'contexts/chat';

const Main = (): JSX.Element => {
  const { author, isOver } = React.useContext(ChatContext);

  return (
    <div>
      <header>
        simple-ws-in-go
      </header>
      <main>
        {
          author && !isOver ? <Chat /> : <Login />
        }
      </main>
    </div>
  );
}

export default Main;
