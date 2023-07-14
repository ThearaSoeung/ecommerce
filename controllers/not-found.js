exports.getNotFoundPage = (req, res, next) => {
    res.render('not_found/not_found', {
        pageTitle: 'Not found'
      });
};