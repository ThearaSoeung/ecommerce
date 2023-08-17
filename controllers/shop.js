const { Product } = require("../models/Product");
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getLandingPage = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "index", 
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.render("shop/product", {
      pageTitle: "Product",
      formsCSS: true,
      productCSS: true,
      products: products,
    });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.postProduct = async (req, res, next) => {};

exports.getCart = async (req, res, next) => {
  const userId = req.user._id.toString();

  const carts = (await Cart.Cart.findCartByUserId(userId)).filter(
    (item) => item.isRemoved === false
  );

  const products = (await Product.findProductByUserId(userId)).filter(
    (item) => item.isRemoved === false
  );

  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    products: products,
    carts: carts,
  });
};

exports.getOrders = async (req, res, next) => {
  try {
    const myProduct = [];
    const user = req.user; 
    const orders = (await Order.Order.getAll()).filter(
      item => item.isCompleted === false && item.user._id.toString() === req.user._id.toString()
    ); 
    const product = (await Product.getAll()).filter(
      item => item.isRemoved === false && item.addedBy.toString() === user._id.toString()
    );
    orders.forEach(orderItem => {
      product.forEach(productItem => {
        orderItem.cart.forEach(cartItem => {
          if (cartItem.productId.toString() === productItem._id.toString()) {
            myProduct.push(productItem);
          }
        });
      }); 
    });

    res.render("shop/order", {
      pageTitle: "Cart",
      path: "/",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      products: myProduct,
      carts: orders[0] === undefined ? [] : orders[0].cart,
      user: user 
    });
  } catch (error) {
    console.error(error);
  }
};
exports.postOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const carts = (await Cart.Cart.findCartByUserId(userId.toString())).filter(
      (item) => item.isRemoved === false 
    );

    const orderCollection = (await Order.Order.getOrderByUserId(userId._id)) 
    .filter(
      (item) => (item.isCompleted === false && item.isRemoved === false)
    ); 

    if(orderCollection.length>0){
      const order = orderCollection[0];
        carts.forEach(cart => {
          let isMatch = false;
          order.cart.forEach(cartItemInOrder => {
            if (cartItemInOrder.productId.toString() === cart.productId.toString()) {
              Order.Order.updateQtyInCart(order._id, cartItemInOrder._id, cart.qty);
              Cart.Cart.isRemoved(cart._id);
              isMatch = true;
            }
          });
          if(!isMatch){
            Order.Order.appendCart(order._id, cart);
            Cart.Cart.isRemoved(cart._id);
          }
        });
    }else{
      await Order.Order.insert(carts, req.user); 
      carts.forEach(cartItem => {
        Cart.Cart.isRemoved(cartItem._id);
      })
    }
  } catch (error) {
    console.log(err);
  }
};

exports.removedAllOrdersFromUser = async (req, res, next) => {
 try {    
    await Order.Order.removeAllOrdersFromUser(req.user._id.toString());
    res.redirect("/shop/orders");
 } catch (error) {
    console.error(error);
 }
};

exports.completedAllOrdersFromUser = async (req, res, next) => {
  try {
    await Order.Order.completeAllOrdersFromUser(req.user._id.toString());
    res.redirect("/shop/orders");
 } catch (error) {
    console.error(error);
 }
};
exports.getProdectDetailById = (req, res, next) => {
  Product.getByPk(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Order",
        path: "/",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        product: product,
      });
    })
    .catch(() => {
      console.log(error);
    });
};

exports.addCartById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const isCardFind = (await Cart.Cart.findCart(userId, productId)).filter(item => item.isRemoved === false);;
    
    if (isCardFind.length === 0) {
      Cart.Cart.insert(userId, productId);
    } else {
      Cart.Cart.updateQtyByPk(isCardFind[0], 1);
    }
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};
exports.removeCartById = async (req, res, next) => {
  await Cart.Cart.deleteCartById(req.params.id)
    .then(async (result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateCartById = async (req, res, next) => {
  try {
    Cart.Cart.ChangeQtyByPk(req.params.id, req.body.quantity);
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
  }
};
