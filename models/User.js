import Sequelize from 'sequelize';

const User = Sequelize.define('users', {
  id: Sequelize.INTEGER.UNSIGNED,
  password: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export default User;
