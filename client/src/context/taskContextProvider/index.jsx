import { createContext, useEffect, useState } from "react";
import { fetchUserTasks } from "../../api/task";
import instanceAxios from "../../config/axios";

const TasksContext = createContext();

const TasksContextProvider = ({ children }) => {
  // all user tasks
  const [tasks, setTasks] = useState([]);

  // initail state when edit back drop is open
  const [initialEditTaskData, setInitialEditTaskData] = useState({
    title: "",
    content: "",
    createdAt: "",
    IsCompleted: false,
    isImportant: false,
  });

  // data that shown when task detail back drop is open
  const [taskDetailData, setTaskDetailData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // back drops states
  const [isEditTaskBackDropOpen, setIsEditTaskBackDropOpen] = useState(false);
  const [isTaskDetailBackDropOpen, setIsTaskDetailBackDropOpen] =
    useState(false);
  const [isCreateTaskBackDropOpen, setIsCreateTaskBackDropOpen] =
    useState(false);

  // toogle important
  const toggleCompleteTask = async (taskId, newValue) => {
    try {
      const res = await instanceAxios.put("/tasks/complete", {
        taskId,
        completedValue: !newValue,
      });

      toast.success("Success");
      setRefresh(!refresh);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // delete task
  const deleteTask = async (taskId) => {
    try {
      const res = await instanceAxios.delete(`tasks/${taskId}`);
      toast.success("Success");
      setRefresh(!refresh);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // toggle imporant task
  const toggleImportant = async (taskId, isImportant) => {
    try {
      const res = await instanceAxios.patch("/task/important", {
        taskId,
        isImportant,
      });

      toast.success("Success");
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  // edit an existant task
  const handleEditTask = async (editedTaskData) => {
    try {
      const res = await instanceAxios.patch("/tasks/edit", editedTaskData);

      toast.success("Success");
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  // create a new task
  const createNewTask = async (e, newTask) => {
    e.preventDefault();
    try {
      const res = await instanceAxios.post("/tasks", newTask);
      setRefresh(!refresh);
      toast.success("Success");
    } catch (err) {
      console.log(err);
    } finally {
      setIsCreateTaskBackDropOpen(false);
    }
  };

  // open the task detail back drop
  const openTaskDetailBackDrop = (taskDetailData) => {
    setIsTaskDetailBackDropOpen(true);
    setTaskDetailData(taskDetailData);
  };

  // open the edit task back drop
  const openEditTaskBackDrop = (editedTaskData) => {
    setIsEditTaskBackDropOpen(true);
    setInitialEditTaskData(editedTaskData);
  };

  useEffect(() => {
    // fetch all tasks
    const fetchAllTasks = async () => {
      try {
        const res = await fetchUserTasks();
        console.log("all tasks", res);
        setTasks(res.result);
      } catch (err) {
        console.log("all tasks", err);
      }
    };

    fetchAllTasks();
  }, [refresh]);

  return (
    <TasksContext.Provider
      value={{
        isEditTaskBackDropOpen,
        isCreateTaskBackDropOpen,
        isTaskDetailBackDropOpen,
        initialEditTaskData,
        handleEditTask,
        tasks,
        taskDetailData,
        toggleCompleteTask,
        deleteTask,
        toggleImportant,
        createNewTask,
        openEditTaskBackDrop,
        openTaskDetailBackDrop,
        openCreateTaskBackDrop: () => setIsCreateTaskBackDropOpen(true),
        closeEditTaskBackDrop: () => setIsEditTaskBackDropOpen(false),
        closeCreateTaskBackDrop: () => setIsCreateTaskBackDropOpen(false),
        closeTaskDetailBackDrop: () => setIsTaskDetailBackDropOpen(false),
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
export { TasksContext };
