const User = require("./user");
const { Product } = require("./Product");
const Cart = require("./cart");
const CartItem = require("./cart-item");

//Product(Many) - User (One)
User.hasMany(Product);
Product.belongsTo(User, {
  constraints: true, 
  onDelete: "CASCADE"
});

//User (One) - Cart (One)
User.hasOne(Cart); 
Cart.belongsTo(User); 

//Cart (Many) - User (Many)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

module.exports = { User, Product };
