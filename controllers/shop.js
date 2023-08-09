const {Product, ProductModel} = require('../models/Product');
const sequelize = require('../util/database')

exports.getLandingPage = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: 'index',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 

exports.getProduct = async (req, res, next) => {
    try {
        const products = await ProductModel.findAll();
        const productsData = products.map(product => product.dataValues);
        res.render('shop/product', {
            pageTitle: 'Product',
            formsCSS: true,
            productCSS: true,
            products: productsData,
        });
    } catch (error) {
        console.log("error:", error);
    }
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
    ProductModel.findByPk(req.params.productId)
    .then((product)=>{
        res.render('shop/product-detail', {
            pageTitle: 'Order',
            path: '/',
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            product: product.dataValues
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
    ProductModel.findByPk(req.params.id)
    .then((product)=>{
        res.render('shop/cart',{
            product: product.dataValues
        })
    })
    .catch((err)=>{
        console.log(err); 
    })  
}; 

exports.postProductID = (req, res, next) => {

}

