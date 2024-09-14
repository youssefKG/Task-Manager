import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import TaskDetail from "../components/ShowTask";

const BackDrop = ({
  isEditTaskBackDropOpen,
  isTaskDetailBackDropOpen,
  isCreateTaskBackDropOpen,
}) => {
  if (isEditTaskBackDropOpen) return <EditTask />;
  else if (isTaskDetailBackDropOpen) return <TaskDetail />;
  else if (isCreateTaskBackDropOpen) return <CreateTask />;
};

const BackDropLayout = ({ children }) => {
  return (
    <div
      className="absolute transition duration-700 ease-in-out z-40 flex
      items-center justify-center  h-screen w-full bg-black/50"
    >
      {children}
    </div>
  );
};

export default BackDropLayout;
