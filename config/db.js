//import the mysql module
const mysql = require("mysql2");

//create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "YOUR_DATABASE_NAME",
  multipleStatements: true,
});

db.connect((err) => {
  //try to connect to the database, if error occurs then it shows error.
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  //else it shows success message
  else {
    console.log("Databae connected successfully.");
  }
});

//It tell other files that this file has db object
module.exports = db;
