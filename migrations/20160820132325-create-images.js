'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'images',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: Sequelize.INTEGER,
        imageable: Sequelize.STRING,
        imageableId: Sequelize.INTEGER,
        publicId: Sequelize.STRING,
        url: Sequelize.STRING,
        format: Sequelize.STRING,
        secureUrl: Sequelize.STRING,
        bytes: Sequelize.INTEGER,
        width: Sequelize.INTEGER,
        height: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('images');
  }
};
