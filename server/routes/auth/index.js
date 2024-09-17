const express = require("express");

const route = express.Router();

const authController = require("../../controllers/auth");
const verifyToken = require("../../middlewares/verifyToken");

route.post("/register", authController.register);
route.post("/login", authController.login);
route.get("/logout", verifyToken, authController.logout);

module.exports = route;
