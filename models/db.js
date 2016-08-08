import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];

console.log(`env: ${env}, host: ${config.host}, database: ${config.database}`);
export default new Sequelize(config.database, config.username, config.password, config);
