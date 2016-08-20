'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'itemMaps',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        itemId: Sequelize.INTEGER,
        itemable: Sequelize.STRING,
        itemableId: Sequelize.INTEGER,
        selectCount: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('itemMaps');
  }
};
