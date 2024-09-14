import React, { useState, useContext } from "react";
import GlobalContextProvider, { GlobalContext } from "../context/GlobalContext";
import TaskCard from "../components/TaskCard";
import { TasksContext } from "../context/taskContextProvider";
import { AiOutlinePlus } from "react-icons/ai";

const AllTasks = () => {
  // task context
  const {
    tasks,
    deleteTask,
    openCreateTaskBackDrop,
    openEditTaskBackDrop,
    toggleCompleteTask,
    openTaskDetailBackDrop,
  } = useContext(TasksContext);

  const [loading] = useState(false);
  const { theme } = useContext(GlobalContext);

  return (
    <div
      className={`flex  flex-col relative gap-8 w-full ${
        theme === "dark" ? "bg-[#1B1B1B] text-white" : "bg-gray-200 text-black"
      }    border-gray-800 rounded-xl border p-6`}
    >
      <div className="flex items-center justify-between">
        <h1
          className={`${theme === "dark" ? "text-white" : "text-black"}
            font-semibold text-2xl  tracking-wider`}
        >
          <span className="border-b-4 pb-2 border-b-green-600 mx-2 ">All</span>
          Tasks
        </h1>
        <button
          className="p-2 hover:opacity-80  rounded-full bg-slate-700"
          onClick={openCreateTaskBackDrop}
        >
          <AiOutlinePlus className="w-5  h-5 text-white" />
        </button>
      </div>
      <div className="w-full overflow-y-auto ">
        <div className="flex flex-wrap gap-6">
          <>
            {tasks.length > 0 &&
              !loading &&
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  taskData={task}
                  deleteTask={() => deleteTask(task.id)}
                  toggleCompleteTask={() =>
                    toggleCompleteTask(task.id, task.completed)
                  }
                  openTaskDetailBackDrop={() => openTaskDetailBackDrop(task)}
                  openEditTaskBackDrop={() => openEditTaskBackDrop(task)}
                />
              ))}
          </>
          <button
            onClick={openCreateTaskBackDrop}
            className="cursor-pointer border-2 border-dashed hover:opacity-80
              border-gray-500 flex w-full items-center justify-center   gap-2
              lg:max-w-xs  min-w-xs h-58   bg-slate-800/20 p-4 rounded-xl"
          >
            <AiOutlinePlus className="w-5  h-5 " />
            <p className="text-xm tracking-wide ">Add New Task</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AllTasks;
