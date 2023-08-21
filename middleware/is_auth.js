module.exports = (req, res, next) => {
    if(!req.session.loginStatus){
        return res.redirect('/admin/login');
    }
    next();
}