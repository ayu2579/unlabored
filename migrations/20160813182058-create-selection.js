'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'selections',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: Sequelize.INTEGER,
        itemId: Sequelize.INTEGER,
        topicId: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('selections');
  }
};
