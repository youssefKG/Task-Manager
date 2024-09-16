const Task = require("../../models/Task");

const getAllTasks = async (userId) => {
  try {
    const findAllTasks = await Task.findAll({ where: { userId } });
  } catch (err) {}
};
