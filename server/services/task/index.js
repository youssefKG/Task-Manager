const taskRepository = require("../../repositorys/taskRepositry");
const validator = require("../../validator");
const CustomError = require("../../utils/customError");

const userTasks = async (userId) => {
  try {
    const tasks = await taskRepository.userTasks(userId);

    return tasks;
  } catch (err) {
    throw err;
  }
};

const deleteTask = async (userId, taskId) => {
  try {
    await taskRepository.deleteTask(userId, taskId);
  } catch (err) {
    throw err;
  }
};

const createTask = async (taskData) => {
  try {
    const { error } = validator.CreateTaskScheama.validate(taskData);

    if (error)
      throw new CustomError(
        "Task creation failed. Please ensure all fields are correctly filled and follow the required format.",
        400,
        error,
      );

    const task = await taskRepository.createTask(taskData);

    return task;
  } catch (err) {
    throw err;
  }
};

const updateTask = async (id, newTaskData) => {
  try {
    const { error } = validator.UpdateTaskSchema.validate(newTaskData);

    if (error)
      throw new CustomError(
        "Task update failed. Please ensure all fields are correctly filled and follow the required format",
        400,
        error,
      );

    const updatedTask = await taskRepository.updateTask(id, newTaskData);

    return updatedTask;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createTask,
  userTasks,
  deleteTask,
  updateTask,
};
