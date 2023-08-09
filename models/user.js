// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); // Reuse the Sequelize instance

const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

module.exports = User;
