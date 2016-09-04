'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'tagMaps',
      ['tagId', 'taggable', 'taggableId'],
      {
        indexName: 'tag_maps_tag_taggable',
        indicesType: 'UNIQUE',
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('tagMaps', 'tag_maps_tag_taggable');
  }
};
