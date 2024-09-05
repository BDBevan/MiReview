const User = require('./User');
const Review = require('./Review');

// Define associations between the two tables
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });


module.exports = { User, Review };
