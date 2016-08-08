import Sequelize from 'sequelize';
import { sequelize } from '../models';

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  fbId: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  fbAccessToken: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export default User;
