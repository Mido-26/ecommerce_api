const sequelize = require('../config/db')
const { DataTypes } = require('sequelize');
const User = require('./User');
const Product = require('./Product')

const Reviews = sequelize.define("Review", {
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT },
});
  
  User.hasMany(Reviews);
  Reviews.belongsTo(User);
  
  Product.hasMany(Reviews);
  Reviews.belongsTo(Product);
  
  module.exports = Reviews;