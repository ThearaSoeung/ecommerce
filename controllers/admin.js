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
    const product = new Product(req.body);
    product.save();
    res.redirect('/admin');
}; 

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product-admin', {
            pageTitle: 'Product',
            formsCSS: true,
            productCSS: true,
            products: products,
        });
    });
}; 

exports.deleteProduct = (req, res, next) => {
    res.redirect('/admin/delete');
}; 

exports.getDeletedProduct = (req, res, next) => {
    res.render('admin/remove_product', {
        pageTitle: 'Add Product',
        path: '',
        formsCSS: true,
        productCSS: true,
    });
}; 

exports.editProduct = (req, res, next) => {
    res.redirect('admin/edit');
    req.next(); 
}; 

exports.getEditedProduct = (req, res, next) => {
    res.render('admin/edit_product', {
        pageTitle: 'Admin edit',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 