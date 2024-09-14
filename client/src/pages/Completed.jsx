import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskCard from "../components/TaskCard";
import { AiOutlinePlus } from "react-icons/ai";
import { TasksContext } from "../context/taskContextProvider";

const Completed = () => {
  // task context api
  const {
    tasks,
    toggleCompleteTask,
    openCreateTaskBackDrop,
    openEditTaskBackDrop,
    openTaskDetailBackDrop,
    deleteTask,
  } = useContext(TasksContext);

  const { theme } = useContext(GlobalContext);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // after edit the task in database this function edited in the browser
  useEffect(() => {
    setCompletedTasks(tasks.filter((task) => task.completed === 0));
  }, [tasks]);

  return (
    <div
      className={`flex flex-col relative gap-8 w-full ${
        theme === "dark" ? "bg-[#1B1B1B] text-white" : "bg-gray-200 text-black"
      } border-gray-800 rounded-xl border p-6`}
    >
      <div className="flex items-center justify-between">
        <h1 className=" font-semibold text-2xl  tracking-wider">
          <span className="border-b-4 pb-2 border-b-green-600 mx-2 ">
            Completed
          </span>
          Tasks
        </h1>
        <button
          onClick={openCreateTaskBackDrop}
          className="p-2 hover:opacity-80  rounded-full bg-slate-700"
        >
          <AiOutlinePlus className="w-5  h-5 text-white" />
        </button>
      </div>

      <div className=" mt-6 flex flex-wrap gap-4  overflow-y-auto   ">
        <>
          {completedTasks.length > 0 &&
            !loading &&
            completedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                taskData={task}
                toggleCompleteTask={() =>
                  toggleCompleteTask(task.id, !task.completed)
                }
                deleteTask={deleteTask}
                openTaskDetailBackDrop={() => openTaskDetailBackDrop(task)}
                openEditTaskBackDrop={() => openEditTaskBackDrop(task)}
              />
            ))}
        </>
        <div
          onClick={openCreateTaskBackDrop}
          className="cursor-pointer border-2 border-dashed hover:opacity-80
            border-gray-500 flex w-full items-center justify-center   gap-2
            lg:max-w-xs  min-w-xs h-58   bg-slate-800/20 p-4 rounded-xl"
        >
          <AiOutlinePlus className="w-5  h-5 " />
          <p className="text-xm tracking-wide ">Add New Task</p>
        </div>
      </div>
    </div>
  );
};
export default Completed;
