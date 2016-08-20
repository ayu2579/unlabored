import Sequelize from 'sequelize';
import { sequelize } from '.';

const Selection = sequelize.define('selection', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  userId: Sequelize.INTEGER,
  productMapId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
}, {
  paranoid: true,
});

export default Selection;
