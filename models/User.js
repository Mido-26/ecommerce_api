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

(async () => {
  await sequelize.sync({ force: false , logging: console.log, alter: true}); // Syncs the model with the database

  console.log('User table created or updated!');
})();

module.exports = User;
