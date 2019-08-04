const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const envName = process.env.NODE_ENV;
const isProd = envName === 'production';
const SERVER_PATH = path.join(`${__dirname}/../src/server/index.js`);
const config = {
  name: 'server',
  entry: {
    server: SERVER_PATH,
  },
  mode: envName,
  output: {
    path: path.join(`${__dirname}/../dist`),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'node',
  devtool: isProd ? '' : 'source-map',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

if (!isProd) {
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: ['npm run run:server:dev'],
    }),
  ];
}
module.exports = config;
