const mySql = require("mysql2");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

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

const dbConfig = {
  USER: process.env.DB_USER,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  dialect: "mysql",
};

const DB = new Sequelize(dbConfig.NAME, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

module.exports = db;

const dbConnection = async () => {
  try {
    await DB.authenticate();
    console.log("authentication sucesss");
  } catch (err) {
    console.log("error in connetion with db:  ", err);
  }
};

module.exports = {
  DB,
  dbConnection,
};
