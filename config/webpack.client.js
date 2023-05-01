require('./configure');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { EnvironmentPlugin } = require('webpack');
const { isProdFunc } = require('./config-utils');

const isProd = isProdFunc();

const plugins = [
  new EnvironmentPlugin({
    // NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    MFE_NAME: 'remote',
    PROD_MODE: 'false',
    DEV_SERVER: 'false',
  }),
  new HtmlWebpackPlugin({
    template: "./public/index.html",
    templateParameters: {
      ...process.env,
    },
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: "public",
        globOptions: {
          ignore: ['**/index.html'],
        },
        // noErrorOnMissing: true,
      },
    ],
  }),
];

module.exports = {
  name: "client",
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.js",
    chunkFilename: '[name].bundle.js',
    publicPath: process.env.MFE_PUBLIC_PATH || '/',
  },
  devtool: isProd ? "source-map" : "cheap-module-source-map",
  target: 'web',
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'public'),
    },
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  plugins,
};
