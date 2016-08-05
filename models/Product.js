import Sequelize from 'sequelize';

const Product = Sequelize.define('products', {
  id: Sequelize.INTEGER.UNSIGNED,
});

export default Product;
