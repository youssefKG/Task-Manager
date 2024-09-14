const mySql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // password: "taoussi@2003",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) return console.log(err);
  console.log("connection success with the databse");
});

module.exports = db;
