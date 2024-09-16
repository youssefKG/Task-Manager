const Task = require("../../models/Task");

const findUserTasks = async (userId) => {
  try {
    const tasks = await Task.findAll({
      where: { userId },
    });

    return tasks;
  } catch (err) {
    console.log(err);
  }
};
const createTask = async (newTaskData) => {
  try {
    const newTask = await Task.create(newTaskData, {
      fields: ["title", "content", "isImporant", "isCompleted"],
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteTask = async (id) => {
  try {
    await Task.destroy({
      where: { id },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateTask = async (newTaskData) => {
  try {
    await Task.update(newTaskData, {
      where: {
        id: newTaskData.id,
      },
      fields: ["title", "content", "isImporant", "isCompleted"],
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const toggleImportant = async (taskId, newIsImportantValue) => {
  try {
    await Task.update(
      { isImporant: newIsImportantValue },
      {
        where: { id: taskId },
        fields: ["isImporant"],
      },
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const toggleCompleted = async (taskId, newComletedValue) => {
  try {
    await Task.update(
      { isImporant: newComletedValue },
      {
        where: { id: taskId },
        fields: ["isCompleted"],
      },
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  findUserTasks,
  createTask,
  deleteTask,
  updateTask,
  toggleImportant,
  toggleCompleted,
};
