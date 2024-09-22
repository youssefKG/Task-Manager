import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useAuth } from "../context/authContext";
import { loginInputSchema, initialLoginInputsValue } from "../lib/auth";
import TextInput from "../components/TextInput";
import FormWrapper from "../components/Form";

const Login = () => {
  const { loginSubmit, isLoginLoading } = useAuth();

  return (
    <div className="flex w-full gap-6  h-screen bg-[#1B1B1B] text-white">
      <div className="hidden  sm:flex flex-1 relative ">
        <img
          src="https://i.pinimg.com/564x/8c/48/4d/8c484daf25f67f6cf43b02681be4c834.jpg"
          alt=""
          className="hidden  w-full md sm:flex  "
        />
        <div className="left-16 absolute top-1/4">
          <h1 className="text-3xl text-gray-300  tracking-widest font-bold">
            Hello.
          </h1>
          <h1 className="text-3xl text-gray-300  tracking-widest font-bold">
            Welcome Back!
          </h1>
          <p className="text-gray-400 max-w-lg font-[500] text-[15px] mt-8 indent-4">
            TaskMaster is a user-friendly web application designed to streamline
            and organize your daily tasks and responsibilities. With TaskMaster,
            you can easily create, prioritize, and track your to-do lists,
            ensuring you stay on top of your work and projects.
          </p>
        </div>
      </div>
      <div className="flex sm:flex-1 w-full items-center justify-center">
        <div className="flex sm:max-w-xl w-full rounded-lg flex-col p-4 gap-4 mb-12">
          <h1
            className="mt-5 font-semibold mb-8 tracking-wider text-2xl
            text-center text-gray-200"
          >
            Login
          </h1>
          <button
            className="bg-white/80 p-3 flex items-center justify-center gap-2
            text-center font-semibold tracking-widest rounded-lg text-black
            hover:opacity-80"
          >
            <img
              src="https://th.bing.com/th?id=ODLS.8ed86604-ea7f-4754-8cd6-2ef699736a7d&w=32&h=32&qlt=90&pcl=fffffa&o=6&cb=1101&pid=1.2"
              alt=" "
              className="w-7 h-7"
            />
            <h1>Continue with Google</h1>
          </button>
          <FormWrapper
            initialValues={initialLoginInputsValue}
            onSubmit={loginSubmit}
            validationSchema={loginInputSchema}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center">
              <div className="h-[1px] w-full bg-gray-400" />
              <p className="mx-2 text-lg text-white">OR</p>
              <div className="h-[1px] w-full bg-gray-400" />
            </div>
            <div className="flex flex-col gap-4 ">
              <TextInput
                type="email"
                placeholder="Your@gmail.com"
                name="email"
                required
              />
              <TextInput
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black/50 p-3 text-center   font-semibold
              tracking-widest rounded-lg text-white hover:opacity-80
              uppercase"
            >
              {!isLoginLoading ? (
                "Login"
              ) : (
                <div className="p-3">
                  <PropagateLoader color="white" size={5} />
                </div>
              )}
            </button>
            <p className="text-gray-400 text-center">
              if you dont have a account?
              <Link
                to="/auth/register"
                className="text-blue-600 ml-2 underline underline-offset-2 "
              >
                Register
              </Link>
            </p>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};
export default Login;
