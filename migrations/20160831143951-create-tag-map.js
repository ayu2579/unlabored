'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'tagMaps',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tagId: Sequelize.INTEGER,
        taggable: Sequelize.STRING,
        taggableId: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tagMaps');
  }
};
