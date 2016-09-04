'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'comments',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: Sequelize.INTEGER,
        commentable: Sequelize.STRING,
        commentableId: Sequelize.INTEGER,
        text: Sequelize.STRING(1000),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};
