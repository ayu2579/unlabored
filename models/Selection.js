import Sequelize from 'sequelize';
import { sequelize } from '.';

const Selection = sequelize.define('selection', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  userId: Sequelize.INTEGER,
  itemId: Sequelize.INTEGER,
  topicId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  getterMethods: {
    type() { return 'selection'; },
  },
});

export default Selection;
