const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const AfterBuildPlugin = require('@fiverr/afterbuild-webpack-plugin');
const { enable, yellow, disable } = require('colors');
const { default: merge } = require('webpack-merge');
const { startDevServerWatchMode } = require('../scripts/dev-server-process');

enable();

// process.on('exit', () => disable());
// process.on('SIGINT', () => disable());

const sharedConfig = {
  target: 'node',

  externals: [webpackNodeExternals()],

  entry: './src/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      }
    ]
  },
};

const devConfig = {
  mode: 'development',

  devtool: 'inline-source-map',
  watch: true,

  plugins: [
    new AfterBuildPlugin(() => {
      startDevServerWatchMode();
    }),
  ]
}

const prodConfig = {
  mode: 'production',

  devtool: 'source-map',
  watch: false,
}

const isDevMode = process.env.NODE_ENV === 'development';

console.log(yellow(`[BUILDER]: Running server build on ${ isDevMode ? 'DEV' : 'PROD' } mode`));

const config = isDevMode ?  devConfig : prodConfig;

module.exports = merge(config, sharedConfig);
