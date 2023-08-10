const Squelize = require("sequelize");

const squelize = require("../util/database");

const ProductModel = squelize.define(
  "Product",
  {
    id: {
      type: Squelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Squelize.STRING,
      allowNull: false,
    },
    price: {
      type: Squelize.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: Squelize.STRING,
      allowNull: false,
    },
    descriptions: {
      type: Squelize.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Product = squelize.define("Product", {
  productName: Squelize.DataTypes.STRING,
});

squelize.sync();

module.exports = { Product, ProductModel };
