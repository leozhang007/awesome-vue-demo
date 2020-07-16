const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "none",
  output: {
    filename: "[name]-[contenthash:8].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    // 多入口提取公共部分
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      // 开启后需手动压缩 js
      new TerserWebpackPlugin(),
    ],
    usedExports: true,
    minimize: true,
    concatenateModules: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
});
