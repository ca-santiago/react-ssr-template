const express = require('express');
const morgan = require('morgan');
const { green } = require('colors');

const { registerExpressDevServer } = require('./register-dev-server.js');

function startDevServer() {
  const app = express();
  app.set('PORT', process.env.PORT | 3300);

  registerExpressDevServer(app);

  app.use(morgan(`${ green('[SERVER]:') } :method :url :status :res[content-length] - :response-time ms`));

  app.use('*', (req, res) => {
    delete require.cache[require.resolve('../dist/server.js')];
    const tunneler = require('../dist/server.js').default;
    return tunneler(req, res);
  });

  app.listen(app.get('PORT'), () => console.log('Listening on port: ' + app.get('PORT')) );
}

startDevServer();
