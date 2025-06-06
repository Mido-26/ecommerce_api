const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance
const cartegory = require('./Category');

const Products = sequelize.define('Products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    buying_price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available',
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

Products.belongsTo(cartegory);
cartegory.hasMany(Products);


module.exports = Products;