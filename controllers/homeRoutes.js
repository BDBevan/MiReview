const router = require('express').Router();
const { User, Review } = require('../models');
const withAuth = require('../utils/auth');
const noAuth = require('../utils/noauth');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/reviews', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      order: [['id', 'ASC']],
      include: [{model: User, attributes:['name']}],
    });

    // console.log(reviewData);

    const reviews = reviewData.map((project) => project.get({ plain: true }));
    console.log(reviews);

    res.render('reviews', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post', withAuth, (req, res) => {

  res.render('post', { 
    logged_in: req.session.logged_in, 
    user_name: req.session.user_name,
    user_id: req.session.user_id
  });
});

router.get('/register', noAuth, (req, res) => {
  res.render('register');
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {

  res.render('profile', {
    logged_in: req.session.logged_in, 
    user_name: req.session.user_name,
    // user_email: req.session.user_email,
  });

});

module.exports = router;
