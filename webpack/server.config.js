const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { default: merge } = require('webpack-merge');
const { yellow } = require('colors');

const isDevMode = process.env.NODE_ENV === 'development';

const sharedConfig = {
  target: 'node',

  externals: [webpackNodeExternals()],

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    library: {
      type: 'commonjs2'
    },
  },

  resolve: {
    extensions: ['...', '.js', '.jsx']
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
  devtool: 'source-map',

  entry: path.resolve(__dirname, '../src/server/ssr-handler.js'),
  
  watch: true,
}

const prodConfig = {
  mode: 'production',
  
  entry: path.resolve(__dirname, '../src/server/index.js'),

  devtool: 'source-map',
  watch: false,
}

console.log(yellow(`Running server build on ${ isDevMode ? 'DEV' : 'PROD' } mode`));

const config = isDevMode ?  devConfig : prodConfig;

module.exports = merge(config, sharedConfig);
