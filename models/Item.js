import Sequelize from 'sequelize';
import { sequelize, User, Image } from '.';

const Item = sequelize.define('items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: Sequelize.INTEGER,
  text: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  paranoid: true,
});

Item.belongsTo(User);
Item.hasMany(Image, {
  foreignKey: 'imageableId',
  scope: {
    imageable: 'item',
  },
});

export default Item;
