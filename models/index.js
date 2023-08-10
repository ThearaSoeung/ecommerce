const sequelize = require("../util/database");
const User = require("./user");
const { ProductModel } = require("./Product");

ProductModel.belongsTo(User, {
  constraints: true, 
  onDelete: "CASCADE"
});

User.hasMany(ProductModel);

module.exports = { User, ProductModel };
