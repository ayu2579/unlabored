'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'topics',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: Sequelize.INTEGER,
        type: Sequelize.STRING,
        title: Sequelize.STRING,
        text: Sequelize.STRING(1000),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('topics');
  }
};
