const { ProductService } = require("../models/Product");
const { ProductDTO } = require("../dtos/product");
const User = require("../models/user");
const { error } = require("console");
const crypto = require('crypto');
const deleteFileHelper = require('../util/deleteFile').deleteFileHelper


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
      req.file.path, 
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

exports.editProductById = (req, res) => {
  ProductService.getByPk(req.params.id)
    .then((product) => {
      if (req.headers.accept === 'application/json') {
        res.status(200).json(product); // Send JSON response for AJAX
      } else {
        res.render("admin/edit_product", {
          pageTitle: "Admin edit",
          path: "/",
          formsCSS: true,
          productCSS: true,
          activeAddProduct: true,
          product: product,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (req.headers.accept === 'application/json') {
        res.status(500).json({ error: "An error occurred." });
      } else {
        // Handle the error in an appropriate way for regular requests
        res.redirect("/admin");
      }
    });
};

exports.postEditedProductById = async (req, res) => {
  try {
    const updatedField = new ProductDTO(
      req.body.product_name,
      req.body.product_price,
      req.body.product_description,
      req.body.product_image, 
    );
    if(req.file){
      const product = await ProductService.getByPk(req.params.id); 
      deleteFileHelper(product.imageUrl); 
      updatedField.setImagePath(req.file.path)
    }
    await ProductService.updateProductByPk(updatedField, req.params.id)
      res.redirect("/admin");
  } 
  catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("An error occurred while updating the product.");
  }
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
  const messageData = {
    from: 'Theara <postmaster@sandbox576bd4a2b2ae4bcaa232784fd9ceac3d.mailgun.org>',
    to: email,
    subject: 'Thanks for Joining Us!',
    html: '<h1>Thanks for Joining Us!</h1><p>A big thank you for signing up with us! We\'re thrilled to have you on board.</p><p>Best regards,<br>Your Name</p>'
  } 
  try {
    const user = await User.insert(email,password)
    res.render('admin/login', {
      flash: req.flash() || {},
      message: "Account created successfully"
    });   

    res.Client.messages.create(res.Domain, messageData)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.error(err);
    })

  } catch (error) {
    res.render('admin/signup', {
      message: "Email already exist!"
    })
  }
};  

exports.getForgetPass = async (req, res) => {
  res.render('admin/forget_pass',{
    message:''
  })
}

exports.postForgetPass = async (req, res) => {
  let message = ''; 
  const email = req.body.email;

  const user = (await User.getAll()).filter(
    item => item.email == email
  )

  if(user.length == 0){
    message = "User associated with this email not found!"
  }else{
    const token = crypto.randomBytes(16).toString('hex');
    const messageData = {
      from: 'Theara <postmaster@sandbox576bd4a2b2ae4bcaa232784fd9ceac3d.mailgun.org>',
      to: email,
      subject: 'Reset Password Link!',
      html: `<p>Click here to reset your account password:<p> 
             <a href="http://localhost:3000/resetpassword/${token}">Reset</a>`
    }
    await User.generateToken(user[0]._id.toString(), token)
    message = "Reset password link has been sent to your email!"
    res.Client.messages.create(res.Domain, messageData)
    .then((res)=>{
      console.log(res);      
    })
    .catch((err)=>{
      console.error(err);
    })
  }
  res.render('admin/forget_pass',{
    message: message
  })
}

exports.getResetPass = async (req, res) => {

  const token = req.params.token; 

  const user = (await User.getAll()).filter(
    item => item.resetPassToken == token
  )

  if(user.length == 0){
    return res.render('shop/index',{
      message: "Token is invalid or expired!",
      flash: {}
    })
  }

  res.render('admin/reset_pass',{
    token: token,
    message: ''
  })
}
exports.postResetPass = async (req, res) => {
  const token = req.params.token;
  const pass = req.body.password;
  //valid pass and confirmedPass 
  const confirmedPass = req.body.confirmedpassword; 

  
  if(pass !== confirmedPass){
    return res.render('admin/reset_pass',{
      token: req.params.token,
      message: 'Password and confirmed password is not matched!'
    })
  }
  
  const user = (await User.getAll()).filter(
    item => item.resetPassToken == token
  )

  if(Date.now() > user[0].resetPassTokenUntil.getTime() || user.length == 0){
    return res.render('shop/index',{
      message: "The link to reset the password is expired!",
      flash: {}
    })
  }

  await User.updatePasswordByToken(token, confirmedPass)
  .then(result=>{
    res.render("admin/login",{
      flash: {},
      message: 'Password has been successfully changed.'
    });
  })
  .catch(error=>{
    console.error(error);
  }); 

};
  exports.deleteProduct = (req, res) => {
    ProductService.deleteProductById(req.params.id)
    .then(() => {
      if (req.headers.accept === 'application/json') {
        res.status(204).end(); // Send a no-content response for AJAX
      } else {
        res.redirect("/admin");
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "An error occurred." }); // Or handle the error in an appropriate way
    });

}
