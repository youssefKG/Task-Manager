import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { TasksContext } from "../context/taskContextProvider";
import TaskCard from "../components/TaskCard";
import { AiOutlinePlus } from "react-icons/ai";

const Important = () => {
  // task Context
  const {
    tasks,
    deleteTask,
    openTaskDetailBackDrop,
    openCreateTaskBackDrop,
    toggleCompleteTask,
    openEditTaskBackDrop,
  } = useContext(TasksContext);
  const { theme } = useContext(GlobalContext);

  // theme of app

  // all important tasks
  const [importantsTasks, setImportantsTasks] = useState([]);

  // filter importants tasks
  useEffect(() => {
    setImportantsTasks(tasks.filter((task) => task.importants === 1));
  }, [tasks]);

  return (
    <div
      className={`flex  flex-col relative gap-8 w-full ${
        theme === "dark" ? "bg-[#1B1B1B] text-white" : "bg-gray-200 text-black"
      } border-gray-800 rounded-xl border p-6`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-white font-semibold text-2xl  tracking-wider">
          <span className="border-b-4 pb-2 border-b-green-600 mx-2 ">
            Important
          </span>
          TaskCards
        </h1>
        <button
          className="p-2 hover:opacity-80  rounded-full bg-slate-700"
          onClick={openCreateTaskBackDrop}
        >
          <AiOutlinePlus className="w-5  h-5 text-white" />
        </button>
      </div>

      <div className=" mt-6 flex flex-wrap gap-4  overflow-y-auto   ">
        <>
          {importantsTasks.length > 0 &&
            importantsTasks.map((task) => (
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

export default Important;
