import Sequelize from 'sequelize';
import { sequelize, User, Image } from '.';

const Notification = sequelize.define('items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: Sequelize.INTEGER,
  text: Sequelize.STRING,
  kind: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  paranoid: true,
  getterMethods: {
    type() { return 'notification'; },
  },
});

export default Notification;
