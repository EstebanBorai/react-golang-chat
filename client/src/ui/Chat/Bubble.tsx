import React from 'react';

interface BubbleProps {
  body: string;
}

const COLORS = {
  me: {
    backgroundColor: '#2392fd',
    color: '#ffffff'
  },
  they: {
    backgroundColor: '#e9e9eb',
    color: '#000000'
  }
}

const Bubble = ({ isOwner, body }: BubbleProps): JSX.Element => {
  const colorScheme = isOwner ? COLORS.me : COLORS.they;

  const style = {
    ...colorScheme,
  };

  return (
    <li className="bubble" style={style}>
      <p>
        {body}
      </p>
    </li>
  );
}

export default Bubble;
