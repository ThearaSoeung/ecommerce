const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    res.render('product/product', {
        pageTitle: 'Product',
        formsCSS: true,
        productCSS: true,
    });
}; 

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}
