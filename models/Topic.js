import Sequelize from 'sequelize';
import { sequelize, User, Item, ItemMap } from '.';

const Topic = sequelize.define('topics', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: Sequelize.INTEGER,
  type: Sequelize.STRING,
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  paranoid: true,
});

Topic.belongsTo(User);
Topic.belongsToMany(Item, {
  through: {
    model: ItemMap,
    unique: false,
    scope: {
      itemable: 'topic',
    },
  },
  foreignKey: 'itemableId',
  constraints: false,
});

export default Topic;
