import React, { useState, useRef, useEffect, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { PropagateLoader } from "react-spinners";
import BackDropLayout from "../layouts/BackDropLayout";
import { TasksContext } from "../context/taskContextProvider";

const CreateTask = () => {
  const ref = useRef();

  // task Context
  const { isCreateTaskBackDropOpen, createNewTask, closeCreateTaskBackDrop } =
    useContext(TasksContext);
  const [loading, setLoading] = useState(false);

  // create taske input values
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
    completed: false,
    important: false,
  });

  // handle create task backdrop input changes
  const handleTaskDataChange = (e) => {
    if (e.target.name === "completed" || e.target.name === "important")
      setTaskData({ ...taskData, [e.target.name]: e.target.checked });
    if (
      e.target.name === "title" ||
      e.target.name === "description" ||
      e.target.name === "date"
    )
      setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // handle Close create task back drop when i click outside it
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isCreateTaskBackDropOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      )
        closeCreateTaskBackDrop();
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isCreateTaskBackDropOpen]);

  return (
    <BackDropLayout>
      <form
        onSubmit={(e) => createNewTask(e, taskData)}
        ref={ref}
        className="text-white flex gap-8 flex-col  p-6 bg-[#1B1B1B] w-full max-w-xs sm:max-w-xl rounded-xl"
      >
        <div className="text-white flex gap-6 flex-col   ">
          <h1 className="text-white text-xl font-semibold tracking-widest">
            Create Task
          </h1>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide"> Title :</p>
            <input
              type="text"
              className=" bg-black rounded-lg p-3 placeholder:text-gray-500 placeholder:font-semibold"
              placeholder="Title..."
              name="title"
              value={taskData.title}
              onChange={handleTaskDataChange}
              required
            />
          </div>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide">
              {" "}
              Descriptioon:
            </p>
            <textarea
              className="bg-black rounded-lg placeholder:text-semibold p-3 placeholder:tracking-wider"
              placeholder="eg: whatch a video about nextjs..."
              name="description"
              id=""
              cols="30"
              rows="4"
              onChange={handleTaskDataChange}
              value={taskData.description}
              required
            ></textarea>
          </div>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide"> Date :</p>
            <input
              type="date"
              className=" bg-black rounded-lg p-3 text-white placeholder:text-gray-500 placeholder:font-semibold"
              placeholder="Title..."
              name="date"
              checked={taskData.date}
              onChange={handleTaskDataChange}
              required
            />
          </div>
          <div className="flex justify-between">
            <label className="text-gray-200 font-medium" htmlFor="">
              Toggle Completed
            </label>
            <input
              type="checkbox"
              className=" accent-blue-600 w-4 h-4"
              name="completed"
              checked={taskData.completed}
              onChange={handleTaskDataChange}
            />
          </div>
          <div className="flex justify-between ">
            <label className="text-gray-200 font-medium" htmlFor="">
              Toggle important
            </label>
            <input
              type="checkbox"
              className=" accent-blue-600 w-4 h-4"
              name="important"
              checked={taskData.important}
              onChange={handleTaskDataChange}
            />
          </div>
        </div>
        <button
          className="p-2 hover:opacity-80 flex rounded-lg max-w-[8rem]
          self-end justify-center gap-1 items-center  bg-blue-700"
        >
          {!loading ? (
            <>
              <AiOutlinePlus className="w-5  h-5 text-white" />
              <p>Create Task</p>
            </>
          ) : (
            <div className="p-3">
              <PropagateLoader color="white" size={5} />
            </div>
          )}
        </button>
      </form>
    </BackDropLayout>
  );
};

export default CreateTask;
