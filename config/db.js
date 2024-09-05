// db.js (or database.js)

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
    },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
    } catch (error) {
        console.error('Unable to connect to MySQL:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
