const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    // res.redirect('/login');
    next();
  } else {
    next();
  }
};

module.exports = withAuth;
