'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        nickname: Sequelize.STRING,
        username: {
          type: Sequelize.STRING,
          unique: true,
        },
        password: Sequelize.STRING,
        fbId: {
          type: Sequelize.STRING,
          unique: true,
        },
        fbAccessToken: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
