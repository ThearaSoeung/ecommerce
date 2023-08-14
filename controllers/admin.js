const { Product } = require("../models/Product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add_product", {
    pageTitle: "Add Product",
    path: "/admin/add_product",
    formsCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  Product.create({
    id: Math.floor(Math.random() * 100) + 1,
    title: req.body.product_name,
    price: req.body.product_price,
    descriptions: req.body.product_description,
    imageUrl: req.body.product_image_url,
    userId: req.user.id
  })
    .then(() => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      const productsData = result.map((product) => product.dataValues);
      res.render("admin/product-admin", {
        pageTitle: "Product",
        formsCSS: true,
        productCSS: true,
        products: productsData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProductById = (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.redirect("/admin");
    })
    .catch(() => {
      console.log(error);
    });
};

exports.getEditedProductById = (req, res) => {
  Product.findByPk(req.params.id)
    .then((product) => {
      res.render("admin/edit_product", {
        pageTitle: "Admin edit",
        path: "/",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        product: product.dataValues,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditedProductById = async (req, res) => {
  try {
    const result = await Product.findByPk(req.params.id);
    value = {
      title: req.body.product_name,
      price: req.body.product_price,
      descriptions: req.body.product_description,
      imageUrl: req.body.product_image_url,
    };
    if (value) {
      Product.update(value, {
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/admin");
    } else {
      // Handle case where product is not found
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
