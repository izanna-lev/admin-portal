/**
 * Webpack config for React.
 * @author Shivender
 **/

const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
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
    mode: "production",
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
      minimize: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },

    // devtool: "source-map",

    // loaders
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          exclude: /\.module\.s?css$/,
        },

        {
          test: /\.module\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
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

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },

        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
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
      new EnvironmentPlugin(env),
      new ProvidePlugin({ process: "process/browser" }),
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      new CompressionPlugin({
        algorithm: "gzip",
        test: /.js$|.css$|.map$/,
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.png",
        hash: true,
        cache: true,
      }),
    ],
  };
};
