const mongoConnect = require('../util/database')

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {}
}

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DataTypes.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.DataTypes.STRING,
//     allowNull: false,
//   },
// });

module.exports = Product;
