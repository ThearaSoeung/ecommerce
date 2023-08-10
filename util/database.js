const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  database: "new_schema",
  username: "root",
  password: "Theara011802399",
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
