module.exports = {
  entry: {
    icon: './app/assets/js/modules/icons/icon.js',
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 100000,
      maxSize: 100000,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '-',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
