import { webSocket } from 'rxjs/webSocket';

const chatContainerEl = document.getElementById('chat-items');

function appendMessage(content, kind) {
  console.log(content);
  const li = document.createElement('li');

  li.className = `message${kind && '' + kind}`;
  li.innerText = content.message;

  chatContainerEl.appendChild(li);
}

function Messenger({
  host,
  port
}) {
  const WS_PATH = `ws://${host}:${port}`;
  const wsInstance = webSocket(WS_PATH);

  this.wsPath = WS_PATH;
  this.webSocket = wsInstance;
};

Messenger.prototype.init = function() {
  this.webSocket.subscribe(
    appendMessage,
    (err) => appendMessage(`ERROR: ${err}`),
    () => appendMessage(`Chat Finalized`)
  );
}

Messenger.prototype.send = function(message) {
  this.webSocket.next({ message, user: 'User 1' });
}

export default Messenger;
