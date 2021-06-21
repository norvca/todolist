const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/img/favicon.ico',
      filename: 'index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          // disable type checker, use ForkTsCheckerWebpackPlugin
          transpileOnly: true,
        },
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
        },
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};
