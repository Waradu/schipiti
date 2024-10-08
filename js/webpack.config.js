const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./script/script.ts",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "../Schipiti/inject/script"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
