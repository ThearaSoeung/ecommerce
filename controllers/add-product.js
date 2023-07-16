const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add_product/add_product', {
        pageTitle: 'Add Product',
        path: '/product/add-product',
        formsCSS: true,
        productCSS: true,
    });
}; 
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body);
    product.save();
    res.redirect('/');
}; 


 