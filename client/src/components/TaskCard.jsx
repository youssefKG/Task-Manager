import { FiEdit } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";

const TaskCard = ({
  taskData,
  deleteTask,
  toggleImportantTask,
  toggleCompleteTask,
  openEditTaskBackDrop,
  openTaskDetailBackDrop,
}) => {
  const theme = "dark";
  return (
    <div
      className={`transition-opacity h-56 w-full ${
        theme === "dark" ? "text-gray-300" : "text-black"
      }    justify-between  cursor-pointer border-[1px]
      hover:opacity-80 border-gray-700 flex flex-col gap-2 lg:max-w-xs
      bg-slate-800/20 p-4 rounded-xl`}
    >
      <div onClick={openTaskDetailBackDrop}>
        <h1
          className={`${theme === "dark" ? "text-white" : "text-black"}
          font-semibold text-xl tracking-wider`}
        >
          {taskData.title}
        </h1>
        <p className={` line-clamp-3 mt-2`}>{taskData.content} </p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className={`  text-xm`}>{taskData.createdAt.split("T")[0]}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={toggleCompleteTask}
            className={`p-2 px-4 text-white tracking-wide text-[14px]
            font-meduim ${!taskData.completed ? "bg-green-600" : "bg-red-800"} rounded-3xl
            hover:opacity-90`}
          >
            {!taskData.IsCompleted ? "Completed" : "Incompleted"}
          </button>
          <div className="flex - items-center gap-4">
            <button onClick={openEditTaskBackDrop} className="hover:opacity-80">
              <FiEdit className="w-5 h-5 " />
            </button>
            <button
              onClick={() => deleteTask(taskData.id)}
              className="hover:opacity-80"
            >
              <BiSolidTrashAlt className="w-5 h-5 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
