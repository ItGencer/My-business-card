const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(avif|jpg|jpeg|png|svg|webp|gif)$/i,
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
    static: "./public",
    port: 3000,
    open: true,
    hot: true,
    headers: (req) => {
      const url = req.url || "";
      const isStaticAsset = url.startsWith("/assets/") || /\.(?:css|js)$/.test(url);

      return {
        "Cache-Control": isStaticAsset
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      };
    },
  },
};
