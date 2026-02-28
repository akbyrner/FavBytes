const path = require('path');
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

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',

      inject: 'body',
    }),
  ],
};
