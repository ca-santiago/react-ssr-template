import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import App from './client/app.jsx';

const app = express();

app.use(express.static('dist/public'));

app.get('/', (_, res) => {
  const html = renderToString(<App />);

  return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div id="root">${ html }</div>
</body>
<script defer src="/bundle.js"></script>
</html>
  `).end();
});

app.listen(3003, () => {
  console.log('Server running');
});
