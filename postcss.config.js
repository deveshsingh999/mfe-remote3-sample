const { isProdFunc } = require("./config/config-utils");

const isProd = isProdFunc();

const plugins = [
  'postcss-preset-env', // already includes `autoprefixer`
];

if (isProd) {
  plugins.push('cssnano'); // should be last in plugins array
}

module.exports = {
  plugins
};
