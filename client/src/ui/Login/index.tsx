import React from 'react';
import ChatContext from 'contexts/chat';

const Login = (): JSX.Element => {
  const [username, setUsername] = React.useState('');

  const { join } = React.useContext(ChatContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    join(username)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  }

  return (
    <section className="application-section">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={handleChange} />
      </form>
    </section>
  );
}

export default Login;
