require('./configure');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { EnvironmentPlugin } = require('webpack');
const { ModuleFederationPlugin } = require("webpack").container;
// const { FederatedTypesPlugin } = require('@module-federation/typescript');
const { isProdFunc } = require('./config-utils');
const deps = require("../package.json").dependencies;
const { getStyleLoaders, styleBasePath } = require("./common.config");

const isProd = isProdFunc();

const miniCssFileName = isProd ? 'style.[contenthash:10].css' : 'style.css';
const miniCssChunkName = isProd ? '[name].[contenthash:10].chunk.css' : '[name].chunk.css';

const federationConfig = {
  name: process.env.MFE_NAME || "remote",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./App": "./src/app",
    "./store": "./src/store/state-store",
    "./routes": "./src/routes/routes-export",
    "./assetsMap": "./src/utils/assets-map-shim",
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps["react-dom"],
    },
    "react-router-dom": {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps["react-router-dom"],
    },
    rxjs: {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps.rxjs,
    },
  },
};

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
      'MFE_NAME': process.env.MFE_NAME || 'remote',
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
  new WebpackManifestPlugin({
    fileName: 'webpack.manifest.json',
  }),
  new MiniCssExtractPlugin({
    filename: `${styleBasePath}${miniCssFileName}`,
    chunkFilename: `${styleBasePath}${miniCssChunkName}`,
    // insert: function (linkTag) {
    //   // Ref: https://webpack.js.org/plugins/mini-css-extract-plugin/#insert
    //   document.head.appendChild(linkTag);
    // },
  }),
  new ModuleFederationPlugin(federationConfig),
  // new FederatedTypesPlugin({
  //   federationConfig,
  // }),
];

module.exports = {
  name: "client",
  mode: isProd ? "production" : "development",
  entry: "./src/index.ts",
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.[contenthash:8].js",
    chunkFilename: '[name].[contenthash:8].bundle.js',
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
      {
        test: /\.s?css$/,
        use: [...getStyleLoaders(false)],
        exclude: /\.module\.s?css$/,
        sideEffects: true,
      },
      {
        test: /\.module\.s?css$/,
        use: [...getStyleLoaders(false, true)],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'dts-loader',
          options: {
            name: federationConfig.name,
            exposes: federationConfig.exposes,
            typesOutputDir: 'dist/types'
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "src": path.resolve(process.cwd(), "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  plugins,
};
