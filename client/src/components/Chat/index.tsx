import * as React from 'react';
import { webSocket } from 'rxjs/webSocket';
import { Message, Session } from '../App';

interface ChatProps {
  messages: Message[];
  session: Session;
}

const Chat = ({ messages, session }: ChatProps): JSX.Element => {
  const [text, setText] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    session.socket.next({
      author: 'me',
      message: text
    });
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
