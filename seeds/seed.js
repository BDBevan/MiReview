const sequelize = require('../config/connection');
const { User, Review } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  // Connects to SQL database
  await sequelize.sync({ force: true }); 

  // Seed userData into User table in DB
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed reviewData into Review table in DB
  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

// Run the function
seedDatabase();