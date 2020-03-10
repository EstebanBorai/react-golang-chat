import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello = (): JSX.Element => (
  <h1>Hello from TypeScript/React!</h1>
);

ReactDOM.render(
  <Hello />,
  document.getElementById('root')
);

