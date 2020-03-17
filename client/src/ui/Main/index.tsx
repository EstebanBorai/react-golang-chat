import React from 'react';
import './main.css';
import Login from 'ui/Login';
import Chat from 'ui/Chat';
import ChatContext, { ChatContextValue } from 'contexts/chat';
import GolangLogo from 'components/GolangLogo';

const Main = (): JSX.Element => {
  const { author, isOver } = React.useContext(ChatContext);

  return (
    <div>
      <header id="header">
        <GolangLogo id="golang-logo" height={32} width={82} />
        <h1>WebSockets with Golang and React!</h1>
      </header>
      <main>
        {/* {
          author && !isOver ? <Chat /> : <Login />
        } */}
        <Chat />
      </main>
    </div>
  );
}

export default Main;
