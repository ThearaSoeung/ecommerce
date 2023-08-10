const { ProductModel } = require("../models/Product");
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
    const products = await ProductModel.findAll();
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

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    product: undefined,
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
  ProductModel.findByPk(req.params.productId)
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
  ProductModel.findByPk(req.params.id)
    .then((product) => {
      res.render("shop/cart", {
        product: product.dataValues,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
