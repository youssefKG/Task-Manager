import AuthLayout from "../../layouts/authLayout";
import Login from "../../pages/login";
import Register from "../../pages/register";

const authRoutes = {
  path: "/auth",
  Component: AuthLayout,
  children: [
    {
      path: "login",
      Component: Login,
    },
    {
      path: "register",
      Component: Register,
    },
  ],
};

export default authRoutes;
