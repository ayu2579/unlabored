import Sequelize from 'sequelize';
import { sequelize, User } from '.';

const Comment = sequelize.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commentable: Sequelize.STRING,
  commentableId: Sequelize.INTEGER,
  text: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  paranoid: true,
  getterMethods: {
    type() { return 'comment'; },
  },
});

Comment.belongsTo(User);

export default Comment;
