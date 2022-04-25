const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '01245312', {dialect: 'mysql', host: 'localhost'} );

module.exports = sequelize;