import Messenger from './script/messenger';

const chat = new Messenger({
  host: 'localhost',
  port: 5200
});

const chatBoxEl = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Gather form values
  const children = document.getElementById('chat-box').elements;
  const values = {};

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (['number', 'text'].indexOf(child.type)) {
      values[child.name] = child.value;
    }
  }

  chat.send(values.message);
});

chat.init();
