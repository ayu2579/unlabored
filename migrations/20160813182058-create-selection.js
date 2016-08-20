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
        itemMapId: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('selections');
  }
};
