import * as React from 'react';

interface LoginProps {
  onSubmit: (username: string) => Promise<void>;
}

const Login = ({ onSubmit }: LoginProps): JSX.Element => {
  const [username, setUsername] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    onSubmit(username)
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
