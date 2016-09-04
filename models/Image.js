import Sequelize from 'sequelize';
import { sequelize } from '.';

const Image = sequelize.define('images', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: Sequelize.INTEGER,
  imageable: Sequelize.STRING,
  imageableId: Sequelize.INTEGER,
  publicId: Sequelize.STRING,
  url: Sequelize.STRING,
  secureUrl: Sequelize.STRING,
  format: Sequelize.STRING,
  bytes: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE,
}, {
  paranoid: true,
  getterMethods: {
    type() { return 'image'; },
  },
});

export default Image;
