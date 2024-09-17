const Task = require("../../models/Task");
const CustomError = require("../../utils/customError");

const userTasks = async (userId) => {
  try {
    const tasks = await Task.findAll({
      where: { userId },
    });

    return tasks;
  } catch (err) {
    throw new CustomError(err.messgae, err.status, err);
  }
};

const createTask = async (taskData) => {
  try {
    const newTask = await Task.create(taskData, {
      fields: ["title", "content", "isImporant", "isCompleted", "userId"],
    });

    return newTask;
  } catch (err) {
    throw new CustomError(err.messgae, err.status, err);
  }
};

const deleteTask = async (userId, id) => {
  try {
    await Task.destroy({
      where: { id },
    });
  } catch (err) {
    console.log(err);
    throw new CustomError(err.messgae, err.status, err);
  }
};

const updateTask = async (id, newTaskData) => {
  try {
    const updatedTask = await Task.update(newTaskData, {
      where: { id },
      fields: ["title", "content", "isImporant", "isCompleted"],
    });

    return updatedTask;
  } catch (err) {
    console.log(err);
    throw new CustomError(err.messgae, err.status, err);
  }
};

module.exports = {
  userTasks,
  createTask,
  deleteTask,
  updateTask,
};
