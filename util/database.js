const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  database: "ecommerce",
  username: "root",
  password: "Theara011802399",
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
