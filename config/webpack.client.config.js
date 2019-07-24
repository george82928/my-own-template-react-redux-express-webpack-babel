require('@babel/polyfill');
const path = require('path');

const envName = process.env.NODE_ENV;
const isProd = envName === 'production';
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  name: 'client',
  entry: {
    main: ['@babel/polyfill', path.join(`${__dirname}/../src/client/index.js`)],
  },
  output: {
    path: path.join(`${__dirname}/../dist/client`),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(`${__dirname}/../dist/client`),
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  mode: envName,
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: isProd },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(`${__dirname}/../src/client/html/index.html`),
      filename: './index.html',
      excludeChunks: ['server'],
    }),
  ],
};

if (isProd) {
  config.devtool = '';
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
