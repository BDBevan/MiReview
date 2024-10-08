const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/post', reviewRoutes);

module.exports = router;
