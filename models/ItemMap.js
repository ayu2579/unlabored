import Sequelize from 'sequelize';
import { sequelize } from '.';

const ItemMap = sequelize.define('itemMaps', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemId: Sequelize.INTEGER,
  itemable: Sequelize.STRING,
  itemableId: Sequelize.INTEGER,
  selectCount: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export default ItemMap;
