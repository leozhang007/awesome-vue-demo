const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { HotModuleReplacementPlugin } = webpack;

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: [path.join(__dirname, "./public")],
    hot: true,
    compress: true,
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.scss/,
        use: [
          "vue-style-loader",
          "css-loader",
          // sass-loader 支持一个 prependData 选项，这个选项允许你在所有被处理的文件之间共享常见的变量，而不需要显示地导入它们
          {
            loader: "sass-loader",
            options: {
              prependData: `$color: red;`,
            },
          },
        ],
      },
      {
        test: /\.sass/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              indentedSyntax: true,
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: ["vue-style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
  devtool: "cheap-modules-eval-source-map",
  plugins: [new HotModuleReplacementPlugin()],
});
