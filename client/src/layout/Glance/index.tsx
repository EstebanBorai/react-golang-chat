import React from 'react';
import './glance.scss';

function Glance(): JSX.Element {
  return (
    <div id="glance">
      <ol id="actions">
        <li>chats</li>
        <li>profile</li>
      </ol>
      <article id="chat-header">
        <figure>
          <img src="http://via.placeholder.com/60" alt="User avatar" height="60" width="60" />
        </figure>
        <div>
          <h3>Name Surname</h3>
          <span>Last seen 3 hours ago</span>
        </div>
      </article>
    </div>
  );
}

export default Glance;
