module.exports = {
  entry: {
    vendor: './app/assets/js/vendor.js',
    main: './app/assets/js/app.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
            limit: 8192,
          },
        },
      },
    ],
  },
};
