const path = require("path");
const dotenv = require("dotenv");

const isProd = process.env.NODE_ENV === 'production';

dotenv.config({ path: path.resolve(process.cwd(), 'env/.env') });
dotenv.config({ path: path.resolve(process.cwd(), isProd ? 'env/.env.prod' : 'env/.env.dev') });

module.exports = {};
