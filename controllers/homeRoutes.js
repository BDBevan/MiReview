const router = require('express').Router();
const { User, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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


router.get('/reviews', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      order: [['id', 'DESC']],
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


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
