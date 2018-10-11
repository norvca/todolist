var path = require("path");

module.exports = {
  // 选择输出文件格式
  mode: "development",
  // 打包文件入口
  entry: "./app/assets/js/App.js",
  // 打包文件出口
  output: {
    path: path.resolve(__dirname, "./app/dist/js/"),
    filename: "App.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};