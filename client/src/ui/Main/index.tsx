import React, { useContext } from 'react';
import './main.css';
import Login from 'ui/Login';
import Chat from 'ui/Chat';
import ChatContext, { ChatContextInterface } from 'contexts/chat';
import GolangLogo from 'components/GolangLogo';

const Main = (): JSX.Element => {
  const { author } = useContext<ChatContextInterface>(ChatContext);

  return (
    <div>
      <header id="header">
        <GolangLogo id="golang-logo" height={32} width={82} />
        <h1>WebSockets with Golang and React!</h1>
      </header>
      <main>
        {
          author ? <Chat /> : <Login />
        }
      </main>
    </div>
  );
}

export default Main;
