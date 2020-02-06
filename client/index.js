const server = 'ws://localhost:5200/';

const conn = new WebSocket(server);

conn.onopen = () => {
  conn.send('Hey');
}

conn.onmessage = (e) => {
  console.log(e.data);
}