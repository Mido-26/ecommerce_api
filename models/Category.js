const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance

const Cartegory = sequelize.define('Cartegory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


// (async () => { 
//     await sequelize.sync({ force: false }); // Syncs the model with the database
//     console.log('Cartegory table created or updated!');
//   })();

  module.exports = Cartegory;
