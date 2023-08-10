const squelize = require("../util/database");
const User = require("./user");
const { Product } = require("./Product");

User.hasMany(Product, {
  as: "products",
  foreignKey: "userId",
});

Product.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

squelize.sync();

module.exports = { User, Product };
