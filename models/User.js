/* eslint-disable object-*/
import Sequelize from 'sequelize';
import { sequelize } from '.';

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fbId: Sequelize.STRING,
  email: Sequelize.STRING,
  nickname: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  fbAccessToken: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  paranoid: true,
  getterMethods: {
    type() { return 'user'; },
    picture() { return `https://graph.facebook.com/${this.fbId}/picture?height=80&width=300`; },
  },
});

export default User;
