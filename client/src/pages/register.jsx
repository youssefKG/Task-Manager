import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { PropagateLoader } from "react-spinners";
import FormWrapper from "../components/Form";
import { initialRegisterInputsValue, registetInputsSchema } from "../lib/auth";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/authContext";

const Register = () => {
  const { registerSubmit, isRegisterLoading } = useAuth();

  return (
    <div className="flex w-full gap-6  h-screen bg-[#1B1B1B] text-white">
      <div className="hidden w-full sm:flex flex-1 relative">
        <img
          src="https://i.pinimg.com/564x/8c/48/4d/8c484daf25f67f6cf43b02681be4c834.jpg"
          alt=""
          className="hidden  w-full sm:flex  "
        />
        <div className="left-16 absolute top-1/4">
          <h1 className="text-3xl text-gray-300  tracking-widest font-bold">
            Welcome!
          </h1>
          <p className="text-gray-400 max-w-lg font-[500] text-[15px] mt-8 indent-4">
            TaskMaster is a user-friendly web application designed to streamline
            and organize your daily tasks and responsibilities. With TaskMaster,
            you can easily create, prioritize, and track your to-do lists,
            ensuring you stay on top of your work and personal projects.
          </p>
        </div>
      </div>
      <div className="flex sm:flex-1 w-full  items-center  justify-center">
        <FormWrapper
          initialValues={initialRegisterInputsValue}
          onSubmit={registerSubmit}
          validationSchema={registetInputsSchema}
          className="flex  sm:max-w-xl w-full  rounded-lg  flex-col p-4 gap-12 mb-12"
        >
          <h1
            className="mt-5 font-semibold mb-8  text-2xl text-center
            text-gray-200 tracking-wider"
          >
            Create account
          </h1>
          <div
            className="bg-white/80 p-3 flex items-center justify-center
            gap-2 text-center   font-semibold tracking-widest rounded-lg
            text-black hover:opacity-80"
          >
            <img
              src="https://th.bing.com/th?id=ODLS.8ed86604-ea7f-4754-8cd6-2ef699736a7d&w=32&h=32&qlt=90&pcl=fffffa&o=6&cb=1101&pid=1.2"
              alt=" "
              className="w-7 h-7"
            />
            <h1>Continue with Google</h1>
          </div>
          <div className="flex items-center">
            <div className="h-[1px] w-full bg-gray-400" />
            <p className="mx-2 text-lg text-white">OR</p>
            <div className="h-[1px] w-full bg-gray-400" />
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-6  flex-col sm:flex-row  ">
              <TextInput
                type="text"
                placeholder="First Name"
                name="firstName"
              />
              <TextInput type="text" placeholder="Last Name" name="lastName" />
            </div>
            <TextInput type="email" placeholder="Your@gmail.com" name="email" />
            <TextInput type="password" placeholder="Password" name="password" />
            <TextInput
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-black/50 p-2 text-center text-sm font-semibold tracking-widest rounded-lg    text-white hover:opacity-80 uppercase">
              {!isRegisterLoading ? (
                "Register"
              ) : (
                <div className="p-3">
                  <PropagateLoader color="white" size={5} />
                </div>
              )}
            </button>
            <p className="text-gray-400 text-center">
              Alredy have a account?
              <Link
                to="/auth/login"
                className="text-blue-600 underline underline-offset-2 ml-2"
              >
                Login
              </Link>
            </p>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};
export default Register;
