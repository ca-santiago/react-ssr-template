const { yellow } = require('colors');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { default: merge } = require('webpack-merge');

const isDevMode = process.env.NODE_ENV === 'development';

const sharedConfig = {
  entry: [
    './src/client/index.js',
    './src/main.scss',
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/static',
  },

  resolve: {
    extensions: ['...', '.js', '.jsx'],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      publicPath: '/static',
    }),
  ],
  
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevMode && 'react-hot-loader/babel'
            ].filter(Boolean),
          }
        },
      },
      {
        test: /\.js?$/,
        include: /node_modules\/react-dom/,
        use: ['react-hot-loader/webpack']
      },
      {
        test: /\.(sass|s?css)/,
        exclude: '/node_modules',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
    ]
  },
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  watch: false,
}

const devConfig = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
  ],

  devtool: 'eval-source-map',

  plugins: [
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: true,
    // }),
    new HotModuleReplacementPlugin(),
  ],
}

console.log(yellow(`Running client build on ${ isDevMode ? 'DEV' : 'PROD' } mode`));

const config = isDevMode ? devConfig : prodConfig;

// console.log({ config: merge(config, sharedConfig) });

module.exports = merge(config, sharedConfig);
