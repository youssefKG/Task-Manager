import { useState, useRef, useEffect, useContext } from "react";
import { PropagateLoader } from "react-spinners";
import { FiEdit } from "react-icons/fi";
import BackDropLayout from "../layouts/BackDropLayout";
import { TasksContext } from "../context/taskContextProvider";
import { createTask } from "../api/task";

const EditTask = () => {
  const ref = useRef();

  // Task Context
  const {
    isEditTaskBackDropOpen,
    closeEditTaskBackDrop,
    handleEditTask,
    initialEditTaskData,
  } = useContext(TasksContext);

  const [loading, setLoading] = useState(false);

  // edit task input state
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    content: "",
    createdAt: "",
    IsCompleted: false,
    isImportant: false,
  });

  // change state when the input change in edit edit task back drop
  const handleTaskDataChange = (e) => {
    if (e.target.name === "IsCompleted" || e.target.name === "isImportant")
      setEditTaskData({ ...editTaskData, [e.target.name]: e.target.checked });
    if (
      e.target.name === "title" ||
      e.target.name === "description" ||
      e.target.name === "date"
    )
      setEditTaskData({ ...editTaskData, [e.target.name]: e.target.value });
  };

  // set the initial values of the task that we want to change
  useEffect(() => {
    setEditTaskData(initialEditTaskData);
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isEditTaskBackDropOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      )
        closeEditTaskBackDrop();
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isEditTaskBackDropOpen]);

  return (
    <BackDropLayout>
      <form
        onSubmit={() => handleEditTask(editTaskData)}
        ref={ref}
        className="text-white flex gap-8 flex-col p-6 bg-[#1B1B1B] w-full max-w-xs sm:max-w-xl rounded-xl"
      >
        <div className="text-white flex gap-6 flex-col">
          <h1 className="text-white text-xl font-semibold tracking-widest">
            Edit Task
          </h1>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide"> Title :</p>
            <input
              type="text"
              className=" bg-black rounded-lg p-3 placeholder:text-gray-500 placeholder:font-semibold"
              placeholder="Title..."
              name="title"
              value={editTaskData.title}
              onChange={handleTaskDataChange}
              required
            />
          </div>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide">
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
              value={editTaskData.content}
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
              value={editTaskData.createdAt.split("T")[0]}
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
              name="IsCompleted"
              checked={editTaskData.IsCompleted}
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
              name="isImportant"
              checked={editTaskData.isImportant}
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
              <FiEdit className="w-5 h-5 text-white" />
              <p>Edit Task</p>
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
export default EditTask;
