/**
 * Webpack config for React development.
 * @author Shivender
 **/

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin, ProvidePlugin } = require("webpack");
const path = require("path");

const APP_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const defaultEnv = {
  BRANCH: "development",
  SERVER: "http://44.209.25.93:3000/",
  S3_URL: "https://app-onsite.s3.amazonaws.com/",
  GOOGLE_API: "AIzaSyByy1LrT-5ZQ642PzXM4m_WCQ-fS6GO-9s",
};

module.exports = (env) => {
  return {
    mode: "development",
    entry: {
      main: `${APP_DIR}/index.tsx`,
    },
    output: {
      clean: true,
      path: BUILD_DIR,
      assetModuleFilename: "[name][ext]",
      filename: "[name].[contenthash].js",
      publicPath: "/",
      sourceMapFilename: "[name].[contenthash].js.map",
    },

    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },

    devtool: "cheap-module-source-map",

    devServer: {
      static: {
        directory: "build",
      },
      historyApiFallback: true,
      compress: true,
      port: 3000,
      hot: true,
      open: true,
    },

    // loaders

    module: {
      rules: [
        // ts, tsx rules

        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        // sass, css rules

        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: /\.module\.s?css$/,
        },

        // sass, css module rules

        {
          test: /\.module\.s?css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: false,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false,
              },
            },
          ],
        },

        // image rules

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },

        // font rules

        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d \.\d \.\d )?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".scss", ".css"],
    },

    // plugins
    plugins: [
      new EnvironmentPlugin(defaultEnv),
      new ReactRefreshWebpackPlugin(),
      new ProvidePlugin({ process: "process/browser" }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.png",
      }),
    ],
  };
};
