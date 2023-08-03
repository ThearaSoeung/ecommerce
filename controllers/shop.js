const { error } = require('console');
const Product = require('../models/product');

exports.getLandingPage = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: 'index',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 

exports.getProduct = (req, res, next) => {
    Product.fetchAll()
    .then((result)=>{
        res.render('shop/product', {
            pageTitle: 'Product',
            formsCSS: true,
            productCSS: true,
            products: result[0],
        });
    })
    .catch((error)=>{
        console.log(error);
    })
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
        activeAddProduct: true,
        product: undefined
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
exports.getProdectDetailById = (req, res, next) => {
    Product.findById(req.params.productId)
    .then((product)=>{
        res.render('shop/product-detail', {
            pageTitle: 'Order',
            path: '/',
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            product: product[0][0]
        });
    })
    .catch(()=>{
        console.log(error); 
    })
}; 

exports.postCart = (req, res, next) => {
    res.redirect('/shop/cart');
};

exports.addCartById = (req, res, next) => {
    Product.findById(req.params.id)
    .then((product)=>{
        res.render('shop/cart',{
            product: product[0][0]
        })
    })
    .catch((err)=>{
        console.log(err); 
    })  
}; 

exports.postProductID = (req, res, next) => {

}

