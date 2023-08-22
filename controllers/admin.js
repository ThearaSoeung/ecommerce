const { ProductService } = require("../models/Product");
const { ProductDTO } = require("../dtos/product");
const User = require("../models/user");
const { error } = require("console");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add_product", {
    pageTitle: "Add Product",
    path: "/admin/add_product",
    formsCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const productDto = new ProductDTO(
      req.body.product_name,
      req.body.product_price,
      req.body.product_description,
      req.body.product_image_url, 
      req.session.user._id.toString(),
      false
    );
    await ProductService.insert(productDto)
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
  }
}

exports.getAdminProducts = async (req, res, next) => {
  try{
    console.log()
    const products = (await ProductService.getAll()).filter( item => item.addedBy.toString() === req.session.user._id.toString())
    res.render("admin/product-admin", {
      pageTitle: "Product",
      formsCSS: true,
      productCSS: true,
      products: products,
    })
  }
  catch(error){
    console.error(error);
  }
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
    flash: req.flash() || {},
    message: ''
  });
};  

exports.postAdminLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.getByEmailAndPassword(email, password);
    req.session.loginStatus = true;
    req.session.user = user;
    await req.session.save();
    req.flash('success', 'Login Successfully');
    res.redirect('/');
  } 
  catch (error) {
      req.flash('error', 'Email or Password is incorrect.');
      res.redirect('/admin/login');
    }
};

exports.getAdminLogout = async (req, res) => {
  await req.session.destroy();
  res.render("shop/index", {
    message: 'Logout Successfully!',
    flash: {}
  });
};

exports.getAdminSignup = async (req, res) => {
  res.render("admin/signup", {
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    message: ''
  });
};

exports.postAdminSignup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password[0];
  const confirmedPassword = req.body.password[1];
  try {
    const user = await User.insert(email,password)
    res.render('admin/login', {
      flash: req.flash() || {},
      message: "Account created successfully"
    });   
  } catch (error) {
    res.render('admin/signup', {
      message: "Email already exist!"
    })
  }
};  