const express = require("express");
const route = express.Router();
const veryfyToken = require("../utils/verifyToken");
const { updateUserProfil } = require("../controllers/user.controllers.js");
route.patch("/update/profil", veryfyToken, updateUserProfil);
module.exports = route