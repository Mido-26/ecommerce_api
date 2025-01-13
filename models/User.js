const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance

const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
  
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = User;
