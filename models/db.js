import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];

/* eslint-disable no-console */
console.log(`env: ${env}, host: ${config.host}, database: ${config.database}`);
const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.log('Unable to connect to the database:', err));
/* eslint-enable no-console */

export default sequelize;
