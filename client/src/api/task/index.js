import api from "../index";

const createTask = async (newTaskData) => {
  try {
    const res = await api.post("/task", newTaskData);
  } catch (err) {
    throw err;
  }
};

const fetchUserTasks = async () => {
  try {
    const res = await api.get("/task");
    return res;
  } catch (err) {
    throw err;
  }
};

const deleteTask = async (taskId) => {
  try {
    const res = await api.delete(`/task/${taskId}`);
    return res;
  } catch (err) {
    throw err;
  }
};

const updateTask = () => {
  try {
  } catch (err) {
    throw err;
  }
};

export { fetchUserTasks, deleteTask, updateTask, createTask };
