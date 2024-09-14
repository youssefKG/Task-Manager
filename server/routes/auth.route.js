const express = require("express");
const route = express.Router();
const { singUp, signIn, signOut } = require("../controllers/auth.controller");
route.post("/signUp", singUp);
route.post("/signIn", signIn);
route.get("/signOut", signOut);
module.exports = route;
