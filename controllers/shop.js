const { Product } = require("../models/Product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");

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
    const products = await Product.fetchAll();
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

exports.postProduct = async (req, res, next) => {
  
};

exports.getCart = async (req, res, next) => {
    const cart = await Cart.findOne({
        where: {
            userId: req.user.id
        }
    });

    let cartItems = []; 

    if(cart != null){
      cartItems = await CartItem.findAll({
        where: {
            cartId: cart.dataValues.id
        }
      });
    }

    const products = await Product.findAll({
        where:{
            userId: req.user.id
        }
    });

    formattedCartItems = cartItems.map(cartItem=>cartItem.dataValues);
    formattedProduct = products.map(product=> product.dataValues);

  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    products: formattedCartItems,
    cartItems: formattedCartItems,
  });
};

exports.getOrders = async (req, res, next) => {
  return await Order.findOne({
    where: {
      userId: req.user.id
    }
  })
  .then(async (result)=>{
    if (result != null){
      return await OrderItem.findAll({
        where:{
          orderId: result.dataValues.id
        }
      })
    }  
    return [];
  })
  .then((result)=>{
    return result.map(item=> item.dataValues);
  })
  .then((result)=>{
    console.log(result);
    res.render("shop/order", {
      pageTitle: "Order",
      path: "/",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      products: Product,
      orderItemList: result
    });
  })
};
exports.postOrders = async (req, res, next) => {
  return await Order.findOne({
    where: {
      userId: req.user.id
    }
  })
  .then(async (result)=>{
    if(result==null){
      return await Order.create({
        userId: req.user.id
      })     
    }
    return result;
  })
  .then(async ()=>{
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    });
    return await CartItem.findAll({
      where: {
        cartId: cart.dataValues.id
      }
    });
  })
  .then(async (result)=>{
    const order = await Order.findOne({
      where: {
        userId: req.user.id
      }
    });
    result.forEach(async (item) => {
      const value = item.dataValues;
      const orderitem = await OrderItem.findOne({
        where: {
          orderId: order.dataValues.id,
          productId: value.productId
        }
      })
      if(orderitem == null){
        await OrderItem.create({
          orderId: order.dataValues.id,
          productId: value.productId,
          quantity: value.quantity
        });
      }else{
        const qty = value.quantity + orderitem.quantity;
        await OrderItem.update({
          quantity: qty
        },{
          where: {
            orderId: order.dataValues.id,
            productId: value.productId
          }
        })
      };
    });
  })
  .then(async (result)=>{    
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    })

    await CartItem.destroy({
      where:{
        cartId: cart.dataValues.id
      }
    })

    await Cart.destroy({
      where: {
        userId: req.user.id
      }
    })
  })
  .then(async (result)=>{
    res.redirect("/shop/orders");  
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.removeAllOrdersFromUser = async (req, res, next) => {
  return await Order.findOne({
    where:{
      userId: req.user.id
    }
  })
  .then(async(result)=>{
    await OrderItem.destroy({
      where:{
        orderId: result.dataValues.id
      }
    })
    await Order.destroy({
        where: {
          userId: req.user.id
        }
    })
  })
  .then(()=>{
    res.redirect("/shop/orders");
  })
};
exports.getProdectDetailById = (req, res, next) => {
  Product.fetchOne(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Order",
        path: "/",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        product: product
      });
    })
    .catch(() => {
      console.log(error);
    });
};

exports.addCartById = async (req, res, next) => {
    return await Cart.findOne({
        where: {
            userId: req.user.id
        }
    })
    .then(async (product)=>{
        if(product == null){
            await Cart.create({
                userId: req.user.id
            })       
        }
        return product;
    })
    .then(async (product)=>{
        let res = [];
        if(product != null){
          res = await CartItem.findAll({
              where: {
                  cartId: product.dataValues.id,
                  productId: req.params.id
              }
          });
        }
        if(res.length == 0){
          return await CartItem.create({
            quantity: 1,
            cartId: product.dataValues.id,
            productId: req.params.id
          });
        }else{
          const qty = res[0].dataValues.quantity + 1;
          await CartItem.update({
            quantity: qty
          },{
            where: {
              cartId: product.dataValues.id,
              productId: req.params.id
            }
          })
        };
    })
    .then(async (result)=>{      
        res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.removeCartById = async (req, res, next) => {
  await CartItem.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(async (result)=>{      
    res.redirect("/cart");
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.updateCartById = async (req, res, next) => {
  await CartItem.update({
    quantity: Object.values(req.body)[0]
    },{
    where:{
      id: req.params.id  
    }
  })
  .then(()=>{
    res.redirect("/cart");
  })
  .catch((err) => {
    console.log(err);
  })
}