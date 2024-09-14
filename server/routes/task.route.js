const express = require("express");
const route = express.Router();
const {
  getAllTasks,
  createTask,
  importantsTasks,
  completedTasks,
  taskCompleted,
  deleteTask,
  editTask,
} = require("../controllers/task.controllers");
const verifyToken = require("../utils/verifyToken");
route.get("/allTasks", verifyToken, getAllTasks);
route.post("/", verifyToken, createTask);
route.get("/completed", verifyToken, completedTasks);
route.get("/importants", verifyToken, importantsTasks);
route.put("/complete", verifyToken, taskCompleted);
route.delete("/:taskId", verifyToken, deleteTask);
route.patch("/edit", verifyToken, editTask);
module.exports = route;
