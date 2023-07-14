exports.getLandingPage = (req, res, next) => {
    res.render('homepage/homepage', {
        pageTitle: 'Homepage',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 