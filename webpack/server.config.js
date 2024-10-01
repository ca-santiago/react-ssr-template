const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { default: merge } = require('webpack-merge');
const { yellow } = require('colors');

const isDevMode = process.env.NODE_ENV === 'development';

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
        use: ['babel-loader'],
      }
    ]
  },
};

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
}

const prodConfig = {
  mode: 'production',

  devtool: 'source-map',
  watch: false,
}

console.log(yellow(`Running server build on ${ isDevMode ? 'DEV' : 'PROD' } mode`));

const config = isDevMode ?  devConfig : prodConfig;

module.exports = merge(config, sharedConfig);
