const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product',{
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    alowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.DataTypes.STRING,
    alowNull: false
  },
  price: {
    type: Sequelize.DataTypes.DOUBLE,
    alowNull: false
  },
  imageUrl: {
    type: Sequelize.DataTypes.STRING,
    alowNull: false
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    alowNull: false
  }
});

module.exports = Product;
