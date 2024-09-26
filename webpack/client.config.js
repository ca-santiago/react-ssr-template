const { yellow } = require('colors');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { default: merge } = require('webpack-merge');

const sharedConfig = {
  entry: ['./src/index.js', './src/main.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/public'),
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  
  module: {
    rules: [
      {
        test: /\.(j|t|m)sx?/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sass|s?css)/,
        exclude: '/node_modules',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  watch: false,

}

const devConfig = {
  devtool: 'eval-source-map',
  watch: true,

  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
    }),
  ]
}

const isDevMode = process.env.NODE_ENV === 'development';

console.log(yellow(`[BUILDER]: Running client build on ${ isDevMode ? 'DEV' : 'PROD' } mode`));

const config = isDevMode ? devConfig : prodConfig;

module.exports = merge(config, sharedConfig);
