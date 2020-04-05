import React from 'react';
import './chat.css';
import ChatContext, { Message } from 'contexts/chat';
import Bubble from './Bubble';

const Chat = (): JSX.Element => {
  const [text, setText] = React.useState('');

  const { send, messages } = React.useContext(ChatContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  }

  return (
    <section className="application-section" id="chat-session">
      <ul className="chat">
        <Bubble
          body="Wikipedia es una enciclopedia libre,nota 2​ políglota y editada de manera colaborativa. Es administrada por la Fundación Wikimedia, una organización sin ánimo de lucro cuya financiación está basada en donaciones."
        />
        <Bubble
          isOwner={true}
          body="Wikipedia es una enciclopedia libre,nota 2​ políglota y editada de manera colaborativa. Es administrada por la Fundación Wikimedia, una organización sin ánimo de lucro cuya financiación está basada en donaciones."
        />
      </ul>
      <div className="chat-input">
        <form action="">
          <input type="text" name="text" value={text} onChange={handleChange} />
          <button type="button" onClick={() => {
            send(text);
          }}>Send</button>
        </form>
      </div>
    </section>
  );
}

export default Chat;
