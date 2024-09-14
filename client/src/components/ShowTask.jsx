import React, { useRef, useEffect, useState, useContext } from "react";
import BackDropLayout from "../layouts/BackDropLayout";
import { TasksContext } from "../context/taskContextProvider";

const TaskDetail = () => {
  const { taskDetailData, closeTaskDetailBackDrop, isTaskDetailBackDropOpen } =
    useContext(TasksContext);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isTaskDetailBackDropOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      )
        closeTaskDetailBackDrop();
      else {
      }
      console.log(isTaskDetailBackDropOpen);
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isTaskDetailBackDropOpen]);

  return (
    <BackDropLayout>
      <div
        ref={ref}
        className="text-white flex gap-8 flex-col  p-6 bg-[#1B1B1B] w-full max-w-xs   sm:max-w-xl rounded-xl"
      >
        <div className="text-white flex gap-6 flex-col   ">
          <h1 className="text-white text-xl font-semibold tracking-widest">
            {" "}
            Task
          </h1>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide"> Title :</p>
            <h className=" bg-black rounded-lg p-3 placeholder:text-gray-500 placeholder:font-semibold">
              {taskDetailData?.title}
            </h>
          </div>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide">
              {" "}
              Descriptioon:
            </p>
            <p className="bg-black rounded-lg placeholder:text-semibold p-3 placeholder:tracking-wider">
              {taskDetailData?.description}
            </p>
          </div>
          <div className="flex  flex-col gap-2">
            <p className="text-gray-200 font-medium tracking-wide"> Date :</p>
            <p className=" bg-black rounded-lg p-3 text-white placeholder:text-gray-500 placeholder:font-semibold">
              {taskDetailData?.date}
            </p>
          </div>

          <div className="flex justify-between flex-col gap-2 ">
            <h className="font-bold text-white mb-2">Type : </h>
            {
              <p
                className={` indent-6 ${taskDetailData?.important ? "text-green-700" : "text-red-800"} font-semibold`}
              >
                {taskDetailData?.important ? "Important" : "Not Important"}
              </p>
            }
            {
              <p
                className={` indent-6 ${taskDetailData?.completed ? "text-green-700" : "text-red-800"} font-semibold`}
              >
                {taskDetailData?.completed ? "Completed" : "Not completed"}
              </p>
            }
          </div>
        </div>
      </div>
    </BackDropLayout>
  );
};

export default TaskDetail;
