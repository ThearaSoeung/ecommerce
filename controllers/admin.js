const { ProductService } = require("../models/Product");
const { ProductDTO } = require("../dtos/product");
const User = require("../models/user")
const { ObjectId } = require('mongoose').Types;


exports.getAddProduct = (req, res, next) => {
  res.render("admin/add_product", {
    pageTitle: "Add Product",
    path: "/admin/add_product",
    formsCSS: true,
    productCSS: true,
    isAuthenticated: req.session.loginStatus
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const productDto = new ProductDTO(
      req.body.product_name,
      req.body.product_price,
      req.body.product_description,
      req.body.product_image_url, 
      req.user._id.toString(),
      false
    );
    await ProductService.insert(productDto)
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
  }
}

exports.getAdminProducts = async (req, res, next) => {
  await ProductService.getAll()
  .then(temp=>{
    res.render("admin/product-admin", {
      pageTitle: "Product",
      formsCSS: true,
      productCSS: true,
      products: temp,
      isAuthenticated: req.session.loginStatus 
    });
  })
  .catch(()=>{
    console.log("Error");
  })
};

exports.deleteProductById = (req, res) => {
  ProductService.deleteProductById(req.params.id)
  .then(() => {
    res.redirect("/admin");
  })
  .catch(() => {
    console.error(error);
  });
};

exports.getEditedProductById = (req, res) => {
  ProductService.getByPk(req.params.id)
    .then((product) => {
      res.render("admin/edit_product", {
        pageTitle: "Admin edit",
        path: "/",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        product: product,
        isAuthenticated: req.session.loginStatus
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditedProductById = async (req, res) => {
    const updatedField = new ProductDTO(
      req.body.product_name,
      req.body.product_price,
      req.body.product_description,
      req.body.product_image_url, 
    );
    ProductService.updateProductByPk(updatedField, req.params.id)
    .then(result=>{
      res.redirect("/admin");
    })
    .catch (error=>{
      console.error(error);
    })
};

exports.getAdminLogin = async (req, res) => {
  res.render("admin/login",{
    isAuthenticated: req.session.loginStatus
  });
};

exports.postAdminLogin = async (req, res) => {
  const userId = new ObjectId('64deedff63a366a7bbb75b54');
  const user = await User.getByPk(userId);
  req.session.username = "Theara Soeung"; 
  req.session.password = "password123@theara";
  req.session.loginStatus = true;
  req.session.user = user;   
  req.session.save((result)=>{
    res.redirect("/");
  })
};

exports.getAdminLogout = async (req, res) => {
  req.session.destroy(()=>{
    res.redirect("/");
  });
};
