require("dotenv").config();// import environment varibles from (.env) to connect the database
const mysql = require("mysql2");//import mysql2


//connect to the mysql by creating connections with the,database name,password,user,host 
const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});

//Checks if the connection is connected or has an error
connection.connect((err) => {
  if (err) {
    console.log("Connection to Database Failed");
    return;
  }
  console.log("Connection to Database Successful");
});

module.exports = connection;//export the connection