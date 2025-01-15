const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.password, {
  host: process.env.db_host,
  dialect: process.env.db_dialect,
  logging: console.log, // Enable logging
});

module.exports = sequelize;
