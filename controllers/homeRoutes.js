const router = require('express').Router();
const { User, Review } = require('../models');
const withAuth = require('../utils/auth');
const noAuth = require('../utils/noauth');

router.get('/', async (req, res) => {
  try {
    // Fetch all users from the database, excluding the password field
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      // Order users alphabetically by name
      order: [['name', 'ASC']],
    });

    // Convert Sequelize model instances to plain JavaScript objects
    const users = userData.map((user) => user.get({ plain: true }));

    // Render the homepage template, passing users data and login status
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If an error occurs during the database query or rendering, send a 500 status with error details
    res.status(500).json(err);
  }
});

router.get('/reviews', async (req, res) => {
  try {
    // Fetch all reviews from the database, ordered by the most recent first
    const reviewData = await Review.findAll({
      order: [['id', 'DESC']], // Sort reviews by ID in descending order (newest first)
      // Include user information, but only retrieve their name
      include: [{ model: User, attributes: ['name'] }],
    });

    // Convert Sequelize model instances to plain JavaScript objects
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    // Log reviews for debugging purposes
    console.log(reviews);

    // Render the reviews page, passing the reviews data and login status
    res.render('reviews', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If an error occurs, send a 500 status with error details
    res.status(500).json(err);
  }
});

router.get('/post', withAuth, (req, res) => {
  res.render('post', { 
    logged_in: req.session.logged_in, // Pass the login status to the template
    user_name: req.session.user_name, // User's name for form prefilling
    user_id: req.session.user_id // User's ID for associating the post
  });
});

router.get('/register', noAuth, (req, res) => {
  // Only show if user is not logged in
  res.render('register');
});

router.get('/login', noAuth, (req, res) => {
  // Only show if user is not logged in
  res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Assuming the user_id is stored in the session
    const user_id = req.session.user_id;

    // Validate that user_id is available
    if (!user_id) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Count the reviews for the logged-in user
    const reviewCount = await Review.count({
      where: {
        user_id: user_id
      }
    });

    // Render the profile page with the review count
    res.render('profile', {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_email: req.session.user_email,
      total_reviews: reviewCount
    });

  } catch (error) {
    console.error('Error counting reviews:', error);
    res.status(500).render('error', { message: 'An error occurred while fetching your profile' });
  }
});

module.exports = router;
