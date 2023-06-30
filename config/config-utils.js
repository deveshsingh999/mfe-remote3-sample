const isProdFunc = () => {
  // const isProduction = process.env.NODE_ENV === 'production';
  const isProd = process.env.PROD_MODE === 'true';
  const devServer = process.env.DEV_SERVER === 'true';
  return !devServer && isProd;
};

module.exports = { isProdFunc };
