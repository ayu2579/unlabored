'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'itemMaps',
      ['itemId', 'itemable', 'itemableId'],
      {
        indexName: 'item_maps_item_itemable',
        indicesType: 'UNIQUE',
      }
    );

    queryInterface.addIndex(
      'selections',
      ['userId', 'itemMapId'],
      {
        indexName: 'selections_user_item_map',
        indicesType: 'UNIQUE',
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('itemMaps', 'item_maps_item_itemable');
    queryInterface.removeIndex('selections', 'selections_user_item_map');
  }
};
