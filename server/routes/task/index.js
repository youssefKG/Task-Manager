const { Router } = require("express");
const route = Router();

const taskControllers = require("../../controllers/task");
const verifyToken = require("../../middlewares/verifyToken");

route.get("/", verifyToken, taskControllers.userTasks);
route.post("/", verifyToken, taskControllers.createTask);
route.put("/:taskId", verifyToken, taskControllers.updateTask);
route.delete("/:taskId", verifyToken, taskControllers.deleteTask);

module.exports = route;
