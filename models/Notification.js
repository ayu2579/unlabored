import Sequelize from 'sequelize';
import { sequelize } from '.';

const Notification = sequelize.define('notifications', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: Sequelize.INTEGER,
  text: Sequelize.STRING,
  action: Sequelize.STRING,
  payload: Sequelize.STRING,
  updatedAt: Sequelize.DATE,
  createdAt: Sequelize.DATE,
}, {
  getterMethods: {
    type() { return 'notification'; },
  },
});

export default Notification;
