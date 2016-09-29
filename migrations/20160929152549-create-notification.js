'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'notifications',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: Sequelize.INTEGER,
        text: Sequelize.STRING(500),
        action: Sequelize.STRING(50),
        payload: Sequelize.DATE(1000),
        updatedAt: Sequelize.DATE,
        createdAt: Sequelize.DATE,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('notifications');
  }
};
