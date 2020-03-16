import React from 'react';
import './chat.css';
import { webSocket } from 'rxjs/webSocket';
import ChatContext, { Message } from 'contexts/chat';

const Chat = (): JSX.Element => {
  const [text, setText] = React.useState('');

  const { send, messages } = React.useContext(ChatContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    send(text);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  }

  return (
    <section className="application-section">
      <div>
        <ul>
          {
            messages.map((message) => (
              <li>{message.author}: {message.message}</li>
            ))
          }
        </ul>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="text" value={text} onChange={handleChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
}

export default Chat;
