const Squelize = require("sequelize");

const squelize = require("../util/database");

const User = squelize.define("User", {
  id: {
    type: squelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Squelize.DataTypes.STRING,
  email: Squelize.DataTypes.STRING,
});

module.exports = User;
