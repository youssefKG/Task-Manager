const taskService = require("../../services/task");

const userTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.userTasks(userId);

    res.status(200).json({
      message: "User Tasks",
      result: tasks,
    });
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, content, isImportant, isCompleted } = req.body;
    const userId = req.user.id;

    const createdTask = await taskService.createTask({
      userId,
      title,
      content,
      isImportant,
      isCompleted,
    });

    res.status(200).json({
      message: "The task is created successfully.",
      result: createdTask,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;

    await taskService.deleteTask(userId, taskId);

    res.status(200).json({
      message: "the task is deleted successfully.",
      result: null,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const taskData = req.body;
    const newTaskData = await taskService.updateTask(taskId, taskData);

    res.status(200).json({
      message: "task updated suceessfully,",
      result: newTaskData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userTasks,
  deleteTask,
  createTask,
  updateTask,
};
