const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
            type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = OrderItem;