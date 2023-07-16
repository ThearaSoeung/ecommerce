const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add_product', {
        pageTitle: 'Add Product',
        path: '/admin/add_product',
        formsCSS: true,
        productCSS: true,
    });
}; 
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body['product-name']);
    product.save();
    res.redirect('/admin');
}; 

exports.getAdminProducts = (req, res, next) => {
    res.render('admin/product-admin', {
        pageTitle: 'Admin Product',
        path: '/admin/product-admin',
        formsCSS: true,
        productCSS: true,
    });
}; 