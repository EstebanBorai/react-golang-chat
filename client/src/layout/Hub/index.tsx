import React from 'react';
import './hub.scss';
import ChatThumbnail from '../../components/ChatThumbnail';

function Hub(): JSX.Element {
  return (
    <section id="hub">
      <ol id="chat-list">
        <ChatThumbnail />
      </ol>
    </section>
  );
}

export default Hub;
