
function registerExpressDevServer(app) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const WebpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack/client.config.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(
    compiler,
    {
      publicPath: config.output.publicPath,
      writeToDisk: true,
      serverSideRender: true,
      stats: 'errors-warnings'
    }
  ));

  app.use(WebpackHotMiddleware(compiler));
}

module.exports = {
  registerExpressDevServer,
}
