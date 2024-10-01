import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { AppContainer } from 'react-hot-loader';

import App from './client/app.jsx';

const domNode = document.getElementById('root');

const root = hydrateRoot(
  domNode, 
  <AppContainer>
    <App />
  </AppContainer>
);

if (module.hot) {
  module.hot.accept('./client/app.jsx', () => {
    const NewApp = require('./client/app.jsx').default;
    root.render(
      <AppContainer>
        <NewApp />
      </AppContainer>
    );
  });
}
