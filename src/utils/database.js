const sequelize = require("sequelize");
const mysql = require("mysql2");
const waitport = require("wait-port");


const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


waitport({
    host: DB_HOST, port: 3306
}).then(()=>{

// Open the connection to MySQL server
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  
  // Run create database statement
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`,
    function (err, results) {
      console.log(results);
      console.log(err);
    }
  );
  
  connection.end();
})


module.exports = new sequelize.Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD,
    { host: DB_HOST, dialect: "mysql", });

