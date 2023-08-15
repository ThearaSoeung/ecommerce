const { Product } = require("../models/Product");


exports.getAddProduct = (req, res, next) => {
  res.render("admin/add_product", {
    pageTitle: "Add Product",
    path: "/admin/add_product",
    formsCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = async (req, res, next) => {

  const title = req.body.product_name;
  const price = req.body.product_price;
  const description = req.body.product_description;
  const imageUrl = req.body.product_image_url;
  
   Product.add(title, price, description, imageUrl)
  
    res.redirect("/admin");
}

exports.getAdminProducts = async (req, res, next) => {
  await Product.fetchAll()
  .then(temp=>{
    res.render("admin/product-admin", {
      pageTitle: "Product",
      formsCSS: true,
      productCSS: true,
      products: temp,
    });
  })
  .catch(()=>{
    console.log("Error");
  })

    // .then((result) => {
    //   const productsData = result.map((product) => product.dataValues);
    //   res.render("admin/product-admin", {
    //     pageTitle: "Product",
    //     formsCSS: true,
    //     productCSS: true,
    //     products: productsData,
    //   });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
};

exports.deleteProductById = (req, res) => {
  Product.deleteProductById(req.params.id)
  .then(() => {
    res.redirect("/admin");
  })
  .catch(() => {
    console.error(error);
  });
};

exports.getEditedProductById = (req, res) => {
  Product.fetchOne(req.params.id)
    .then((product) => {
      console.log(product);
      res.render("admin/edit_product", {
        pageTitle: "Admin edit",
        path: "/",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditedProductById = async (req, res) => {
    value = {
      title: req.body.product_name,
      price: req.body.product_price,
      description: req.body.product_description,
      imageUrl: req.body.product_image_url,
    };
    Product.updateProductByID(req.params.id, value)
    .then(result=>{
      res.redirect("/admin");
    })
    .catch (error=>{
      console.error(error);
    })
};
