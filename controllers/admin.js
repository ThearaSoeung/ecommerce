const { error, Console } = require('console');
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
    product.save()
        .then(()=>{
            res.redirect('/admin');
        })
        .catch((err)=>{
            console.log(err)
        });
    
}; 

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll()
        .then((result)=>{
            res.render('admin/product-admin', {
                pageTitle: 'Product',
                formsCSS: true,
                productCSS: true,
                products: result[0],
            });
        }).catch((err)=>{
            console.log(err); 
        })
    
    // (products => {
    //     res.render('admin/product-admin', {
    //         pageTitle: 'Product',
    //         formsCSS: true,
    //         productCSS: true,
    //         products: products,
    //     });
    // });
}; 


exports.deleteProductById = (req, res) => {
    Product.deleteById(req.params.id)
    .then(()=>{
        res.redirect('/admin');
    })
    .catch(()=>{
        console.log(error);
    })
}; 

exports.getDeletedProduct = (req, res, next) => {
    res.render('admin/remove_product', {
        pageTitle: 'Add Product',
        path: '',
        formsCSS: true,
        productCSS: true,
    });
}; 

exports.DeletedProduct = (req, res, next) => {
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

exports.getEditedProductById = (req, res) => {
        Product.findById(req.params.id)
        .then((product)=> {
            res.render('admin/edit_product', {
                pageTitle: 'Admin edit',
                path: '/',
                formsCSS: true,
                productCSS: true,
                activeAddProduct: true, 
                product: product[0][0],
            });
        })
        .catch((err)=> {
            console.log(err); 
        })
}; 
exports.postEditedProductById = (req, res) => {
    console.log(req); 
    Product.update(req)
    .then(()=>{
        res.redirect('/admin'); 
    })
    .catch(()=>{
        console.log(error);
    })
};