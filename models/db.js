import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];

/* eslint-disable no-console */
console.log(`env: ${env}, host: ${config.host}, database: ${config.database}`);
/* eslint-enable no-console */
export default new Sequelize(config.database, config.username, config.password, config);
