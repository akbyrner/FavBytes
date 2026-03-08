require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: '[name].[contenthash].js',

    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],

    alias: {
      '@': path.resolve(__dirname, 'client'),
      '@components': path.resolve(__dirname, 'client/components'),
    },
  },

  devServer: {
    port: 8080,
    headers: {
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
    proxy: [
      {
        context: ['/auth', '/api'],
        target: 'http://localhost:3001',
      },
    ],
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',

      inject: 'body',
    }),
    new webpack.DefinePlugin({
      MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
    }),

    new webpack.DefinePlugin({
      GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
    }),
  ],
};
