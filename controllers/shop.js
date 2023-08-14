const { format } = require("path");
const { Product } = require("../models/Product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

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
    const products = await Product.findAll();
    const productsData = products.map((product) => product.dataValues);
    res.render("shop/product", {
      pageTitle: "Product",
      formsCSS: true,
      productCSS: true,
      products: productsData,
    });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.getCart = async (req, res, next) => {
    const cart = await Cart.findOne({
        where: {
            userId: req.user.id
        }
    });

    const cartItems = await CartItem.findAll({
        where: {
            cartId: cart.dataValues.id
        }
    });

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

exports.getOrders = (req, res, next) => {
  res.render("shop/order", {
    pageTitle: "Order",
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.getProdectDetailById = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Order",
        path: "/",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        product: product.dataValues,
      });
    })
    .catch(() => {
      console.log(error);
    });
};

exports.addCartById = (req, res, next) => {
    const products = Cart.findOne({
        where: {
            userId: req.user.id
        }
    })
    .then((product)=>{
      console.log(product)
        if(product==null){
            Cart.create({
                userId: req.user.id
            })       
        }
        return product;
    })
    .then(async (product)=>{

        const res = await CartItem.findAll({
            where: {
                cartId: product.dataValues.id
            }
        });

        if(res.length == 0){
            return await CartItem.create({
                quantity: 0, 
                cartId: product.dataValues.id,
            })
        }else{
            return res;
        }
    })
    .then(async (product)=>{
        const qty = product[0].dataValues.quantity == 0 ? 1 : product[0].dataValues.quantity + 1 ;
        await CartItem.update({
            productId: req.params.id, 
            quantity:qty
        },  
        {
            returning: true,
            where: {
                cartId: product[0].dataValues.cartId
            }
        }); 
        return await CartItem.findOne({
            where: {
                cartId: product[0].dataValues.cartId
            }
        });
    })
    .then(async (result)=>{
        // const product = await Product.findByPk(result.dataValues.productId);
        // const item = await CartItem.findByPk(result.dataValues.id);
        // res.render("shop/cart",{
        //     product: product.dataValues,
        //     item: item.dataValues
        // })
        res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
