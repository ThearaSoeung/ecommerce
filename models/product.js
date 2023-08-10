const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ProductModel = sequelize.define(
  "Product",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descriptions: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
);

// const Product = sequelize.define("Product", {
//   productName: Sequelize.DataTypes.STRING,
// });

module.exports = { ProductModel };
