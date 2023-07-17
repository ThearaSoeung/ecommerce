const Product = require('../models/product');

exports.getLandingPage = (req, res, next) => {
    res.render('shop/homepage', {
        pageTitle: 'Homepage',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product', {
            pageTitle: 'Product',
            formsCSS: true,
            productCSS: true,
            products: products,
        });
    });
}; 

exports.postProduct = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 

exports.getOrders = (req, res, next) => {
    res.render('shop/order', {
        pageTitle: 'Order',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 

exports.postCart = (req, res, next) => {
    res.redirect('/shop/cart');
}; 