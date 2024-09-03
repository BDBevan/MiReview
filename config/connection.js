const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      // host: 'localhost', /* when working on local machine */
      host: 'dpg-crbdlvjtq21c73chi1vg-a', /* when deployed with Render */
      dialect: 'postgres',
    }
  );

module.exports = sequelize;