const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    splash: './src/frontend/views/splash.js'
},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      // Babel loader for JS (ES6+ to ES5)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // CSS loader for .css files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // SCSS loader for .scss files
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // HTML loader for .html files
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/frontend/views/splash.html',
      filename: 'splash.html',
      chunks: ['splash'],
  }),
  new HtmlWebpackPlugin({
      template: './src/frontend/views/index.html',
      filename: 'index.html',
      chunks: ['main'],
  }),
  ],
};
