const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    // Takes data from input
    const userData = await User.findOne({ where: { email: req.body.email } });

    // Validation
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check hash (if password is correct)
    const validPassword = await userData.checkPassword(req.body.password);

    // Validation
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Logs the user in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.user_email = userData.email;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/register', async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Check if the password meets the length requirement (8 characters)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password
    });

    // If user creation is successful, log them in automatically
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.user_name = newUser.name;
      req.session.user_email = newUser.email;
      req.session.logged_in = true;
      
      res.status(201).json({ 
        user: newUser, 
        message: 'Registration successful! You are now logged in.' 
      });
    });

  } catch (err) {
    // If there's a unique constraint error (email already exists), send a specific message
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'The email address is already in use' });
    }
    // For any other error, send a general error message
    res.status(500).json({ message: 'An error occurred while registering the user', error: err.message });
  }
});

module.exports = router;
