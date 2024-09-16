const db = require("../db/db.js");
const errorHandler = require("../utils/errorHandler.js");

const getAllTasks = (req, res, next) => {
  const query = "SELECT * FROM tasks WHERE userid = ?";

  db.query(query, [req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(result);
    return res.status(200).json(result);
  });
};

const createTask = (req, res, next) => {
  const userId = req.user.id;

  const { title, description, date } = req.body;

  const important = req.body.important ? 1 : 0;
  const completed = req.body.completed ? 1 : 0;

  const query =
    "INSERT INTO tasks (userid , title , description,date , completed ,importants ) values ? ";

  db.query(
    query,
    [[[userId, title, description, date, completed, important]]],
    (err, result) => {
      if (err) return next(err);
      res.status(200).json("task created !");
    },
  );
};

const completedTasks = (req, res, next) => {
  const { userId } = req.user.id;

  const query = "SELECT * FROM tasks WHERE  completed = ? AND userid = ? ";

  db.query(query, [1, userId], (err, rows) => {
    if (err) return next(err);

    res.status(200).json(rows);
  });
};

const importantsTasks = (req, res, next) => {
  const userId = req.user.id;

  if (req.user.id !== +userId) return next(errorHandler(401, "Unauthorized"));

  const query = "SELECT * FROM tasks WHERE importants = ? AND  userid = ?  ";

  db.query(query, [1, +userId], (err, rows) => {
    if (err) return next(err);

    res.status(200).json(rows);
  });
};

const taskCompleted = (req, res, next) => {
  const { taskId, completedValue } = req.body;
  const userId = req.user.id;
  console.log(userId);

  console.log(req.body);

  const query = "UPDATE tasks SET completed = ? WHERE  id = ? AND userid = ?";

  db.query(
    query,
    [completedValue === true ? 1 : 0, +taskId, +userId],
    (err, result) => {
      console.log(err);
      if (err) return next(err);
      res.status(200).json("Success");
    },
  );
};

const deleteTask = (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  const query = "DELETE FROM tasks WHERE id = ? AND  userid = ?";

  db.query(query, [taskId, userId], (err, rows) => {
    if (err) return next(err);
    return res.status(200).json("deleted");
  });
};

const editTask = (req, res, next) => {
  const { id, userId, title, description, date, important, completed } =
    req.body;
  if (req.user.id !== userId) return next(errorHandler(401, "Unauthorized"));
  const query =
    "UPDATE tasks SET title = ? , description = ? , date = ? ,  importants = ? , completed = ? where id = ? AND userid = ?";
  db.query(
    query,
    [
      title,
      description,
      date,
      important ? 1 : 0,
      completed ? 1 : 0,
      id,
      userId,
    ],
    (err, rows) => {
      console.log(err);
      if (err) return next(err);

      return res.status(200).json("Updated!!");
    },
  );
};

module.exports = {
  getAllTasks,
  createTask,
  completedTasks,
  importantsTasks,
  taskCompleted,
  deleteTask,
  editTask,
};
