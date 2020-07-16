const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./src/main.ts",
  output: {
    filename: "[name].[hash:8].js",
    path: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
    alias: {
      "@": path.resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          hotReload: process.env.NODE_ENV !== "production",
        },
      },
      {
        test: /\.(js|vue)$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        enforce: "pre",
        loader: "tslint-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              // 需要将 esModule 关闭，要不打包之后，img 的 src="[object Module]"
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        oneOf: [
          // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
          {
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"],
          },
          // 这条规则应用到 JavaScript 内的 pug 导入
          {
            use: ["raw-loader", "pug-plain-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "awesome vue",
      template: "public/index.html",
      templateParameters: {
        BASE_URL: "/",
      },
    }),
  ],
};
