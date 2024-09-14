import EditTask from "./EditTask";
import CreateTask from "./CreateTask";
import TaskDetail from "./ShowTask";
import { useContext } from "react";
import { TasksContext } from "../context/taskContextProvider";

const BackDrop = () => {
  const {
    isEditTaskBackDropOpen,
    isTaskDetailBackDropOpen,
    isCreateTaskBackDropOpen,
  } = useContext(TasksContext);
  if (isEditTaskBackDropOpen) return <EditTask />;
  else if (isTaskDetailBackDropOpen) return <TaskDetail />;
  else if (isCreateTaskBackDropOpen) return <CreateTask />;
  else return null;
};

export default BackDrop;
