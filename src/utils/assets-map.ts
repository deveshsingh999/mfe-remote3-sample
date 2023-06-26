import assetsMap from '../../dist/webpack.manifest.json';

const mfeName = process.env.MFE_NAME || "remote";

const mfeAssetsMap = Object.entries(assetsMap).reduce((acc, [key, value]) => {
  return { ...acc, [`${mfeName}:${key}`]: value };
}, {});

export default mfeAssetsMap;
