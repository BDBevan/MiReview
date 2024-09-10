// Access control - continue only if user is not logged in
const noAuth = (req, res, next) => {
    if (req.session.logged_in) {
      res.redirect('/');
    } else {
      next();
    }
  };
  
  module.exports = noAuth;
  