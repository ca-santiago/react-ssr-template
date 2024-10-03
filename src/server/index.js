import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import handleSSRAppRender from './ssr-handler';

dotenv.config();

// const isDevEnv = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3300;

const app = express();
app.set('PORT', PORT);

app.use('/static/index.html', (_, res) => res.status(404).end());
app.use('/static', express.static(path.join(__dirname, '/public')));

app.use('*', handleSSRAppRender);

app.listen(app.get('PORT'), () => {
  console.log(`Runnning on port: `, PORT);
});
