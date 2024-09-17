const mySql = require("mysql2");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

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
