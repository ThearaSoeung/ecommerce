const User = require("./user");
const { Product } = require("./Product");
const Cart = require("./cart");
const CartItem = require("./cart-item");
const OrderItem = require("./order-item");
const Order = require("./order");

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

// User (One) - Order (Many)
User.hasMany(Order);
Order.belongsTo(User);

// Order (Many) - Product (Many) through OrderItems
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = { User, Product };
