import Sequelize from 'sequelize';
import { sequelize } from '.';

const Tag = sequelize.define('tags', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: Sequelize.STRING,
  title: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE,
}, {
  paranoid: true,
  getterMethods: {
    type() { return 'tag'; },
  },
});

export default Tag;
