import Sequelize from 'sequelize';
import { sequelize } from '.';

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commentable: Sequelize.STRING,
  commentableId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  paranoid: true,
});

export default Comment;
