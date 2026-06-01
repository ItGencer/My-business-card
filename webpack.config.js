// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "public"), // ← змінили dist на public
    filename: "bundle.[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. виносить у окремий .css файл
          "css-loader", // 2. розуміє @import, url()
          "sass-loader", // 1. компілює scss → css (виконується першим)
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|webp|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
  ],

  devServer: {
    static: "./public", // ← і тут теж
    port: 3000,
    open: true,
    hot: true,
  },
};
