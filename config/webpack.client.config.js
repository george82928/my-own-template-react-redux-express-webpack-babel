require('@babel/polyfill');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development';
  const devtool = isDevelopmentMode ? 'inline-source-map' : '';
  const config = {
    name: 'client',
    entry: {
      main: [
        '@babel/polyfill',
        path.join(`${__dirname}/../src/client/index.js`),
      ],
    },
    output: {
      path: path.join(`${__dirname}/../dist/client`),
      publicPath: '/',
      filename: '[name].js',
    },
    devServer: {
      contentBase: path.join(`${__dirname}/../dist/client`),
      proxy: {
        '/api/v1': 'http://localhost:3000',
      },
    },
    target: 'web',
    devtool,
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
      new LodashModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: path.join(`${__dirname}/../src/client/html/index.html`),
        filename: './index.html',
        excludeChunks: ['server'],
      }),
    ],
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
      },
    },
  };

  if (!isDevelopmentMode) {
    config.plugins.push(new UglifyJsPlugin());
  }
  return config;
};
