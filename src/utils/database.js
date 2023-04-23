const sequelize = require("sequelize");


const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


module.exports = new sequelize.Sequelize(
    DB_NAME,
    DB_USER, DB_PASSWORD,
    {
        host: DB_HOST, dialect: "mysql",
    });

