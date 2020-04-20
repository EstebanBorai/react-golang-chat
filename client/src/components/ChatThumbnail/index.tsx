import React from 'react';
import './chat-thumbnail.scss';

function ChatThumbnail(): JSX.Element {
  return (
    <li className="chat-thumbnail">
      <figure>
        <img src="http://via.placeholder.com/50" height="50" width="50" />
      </figure>
      <article>
        <h3>Name Surname</h3>
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perspiciatis id asperiores? Tenetur dicta fugiat cumque quas, nam sit. Tenetur ullam natus deleniti fugiat accusamus, fugit consequatur libero veniam nostrum.</span>
      </article>
      <div>
        <time>3:43 PM</time>
        <span>3</span>
      </div>
    </li>
  );
}

export default ChatThumbnail;
