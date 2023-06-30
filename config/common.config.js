const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isProdFunc } = require('./config-utils');

const isProd = isProdFunc();
const devServer = process.env.DEV_SERVER === 'true';
const mfeName = process.env.MFE_NAME || "remote";

function getStyleLoaders(isServer, modules = false) {
  const nextLoaders = [postcssLoader()];
  const loaders = [cssLoader(nextLoaders.length, modules), ...nextLoaders];

  if (devServer) {
    loaders.unshift(styleLoader(modules));
  } else {
    loaders.unshift(cssExtractLoader(isServer, modules));
  }

  return loaders;
}

function postcssLoader() {
  return ({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve(process.cwd(), 'postcss.config.js'),
      },
    },
  });
}

function cssLoader(nextCount, modules = false) {
  if (!modules) {
    return 'css-loader';
  }

  return ({
    loader: 'css-loader',
    options: {
      importLoaders: nextCount,
      modules: {
        // namedExport: true,
        exportLocalsConvention: 'camelCaseOnly',
        localIdentName: `${mfeName}_${isProd ? '[hash:base64]' : '[name]__[local]__[hash:base64:5]'}`,
      },
    }
  });
}

function styleLoader(modules = false) {
  return ({
    loader: 'style-loader',
  });
}

function cssExtractLoader(isServer, modules = false) {
  return ({
    loader: MiniCssExtractPlugin.loader,
    options: {
      emit: !isServer,
    }
  });
}

const styleBasePath = 'css/';

module.exports = { getStyleLoaders, styleBasePath };
