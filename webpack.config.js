const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack build setup: bundles JS, extracts CSS, and copies static assets.
// Налаштування Webpack: збирає JS, виносить CSS і копіює статичні ресурси.
module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },

  // Loaders: compile SCSS and emit images/icons as separate cacheable files.
  // Loaders: компілюють SCSS і виводять зображення/іконки окремими кешованими файлами.
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

  // Plugins: generate final HTML and hashed CSS for browser caching.
  // Plugins: генерують фінальний HTML і CSS з hash для кешування браузером.
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
  ],

  // Dev server cache headers mirror production-friendly asset caching during local checks.
  // Cache headers dev-сервера імітують production-friendly кешування ресурсів під час локальної перевірки.
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
