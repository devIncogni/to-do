const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.htm",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(html|htm)$/i,
        use: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
