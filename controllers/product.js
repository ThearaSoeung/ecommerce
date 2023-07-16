const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('product/product', {
            pageTitle: 'Product',
            formsCSS: true,
            productCSS: true,
            products: products,
        });
    });
}; 

