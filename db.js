//require mysql driver form database connection with mysql
const mysql = require("mysql");

/** 
  database connection setup
  host: your host name,
  user: your database user name,
  password : your database password,
  database: your database name,
**/
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
});

//database establish
db.connect();

//export for available outside this file
module.exports = db;
