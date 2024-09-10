const router = require('express').Router();
const { Review } = require('../../models');

router.post('/', async (req, res) => {
    try {
      // Extract data from the request body
      const { media_type, title, content, user_id } = req.body;
  
      // Validate that all required fields are present
      if (!media_type || !title || !content || !user_id) {
        return res.status(400).json({ message: 'Please provide media_type, title, content, and user_id' });
      }
  
      // Create a new review in the database
      const newReview = await Review.create({
        media_type,
        title,
        content,
        user_id,
      });
  
      // If successful, send back the new review
      res.status(201).json(newReview);
    } catch (err) {
      // If there's an error, send the error in the response
      res.status(500).json(err);
    }
  });

module.exports = router;