import Sequelize from 'sequelize';
import { sequelize } from '.';

const TagMap = sequelize.define('tagMaps', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tagId: Sequelize.STRING,
  taggable: Sequelize.STRING,
  taggableId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export default TagMap;
