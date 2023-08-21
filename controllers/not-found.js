exports.getNotFoundPage = (req, res, next) => {
  res.render("not_found", {
    pageTitle: "Not found",
    isAuthenticated: req.session.loginStatus 
  });
};
