import React from 'react';
import './app.scss';
import Header from '../Header';
import Glance from '../../layout/Glance';
import Hub from '../../layout/Hub';
import Chat from '../../layout/Chat';

function App(): JSX.Element {
  return (
    <div id="gabble">
      <Header />
      <main id="app-main">
        <Glance />
        <div id="chat-main">
          <Hub />
          <Chat />
        </div>
      </main>
    </div>
  );
}

export default App;
