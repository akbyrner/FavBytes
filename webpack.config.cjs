// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point - where Webpack starts bundling
  entry: '/client/index',
  mode: 'development',
  // Output configuration
  output: {
    // Output directory
    path: path.resolve(__dirname, 'dist'),
    // Output filename with content hash for cache busting
    filename: '[name].[contenthash].js',
    // Clean the output directory before each build
    clean: true,
  },

  // Module rules define how different file types are processed
  module: {
    rules: [
      {
        // Process JavaScript and JSX files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Cache compilation results for faster rebuilds
            cacheDirectory: true,
          },
        },
      },
      {
        // Process CSS files
        test: /\.css$/,
        use: [
          // Injects CSS into the DOM via style tags
          'style-loader',
          // Interprets @import and url() like import/require
          'css-loader',
        ],
      },
      {
        // Process image files
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Resolve configuration
  resolve: {
    // Allow importing without specifying extensions
    extensions: ['.js', '.jsx'],
    // Create aliases for common import paths
    alias: {
      '@': path.resolve(__dirname, '/client'),
      '@components': path.resolve(__dirname, '/client/components'),
//      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },

  // Plugins extend Webpack functionality
  plugins: [
    new HtmlWebpackPlugin({
      // Use our HTML template
      template: '/client/index.html',
      // Inject scripts at the end of body
      inject: 'body',
    }),
  ],
};
