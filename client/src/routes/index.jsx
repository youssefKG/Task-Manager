import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllTasks from "../pages/AllTasks";
import ImporatantsTasks from "../pages/ImportantsTasks";
import DoItNow from "../pages/DoItNow";
import Completed from "../pages/Completed";
import Login from "../pages/login";
import Register from "../pages/register";
import PrivateRoute from "../layouts/PrivateRoute";
import Profil from "../pages/Profil";

const routes = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: PrivateRoute,
    children: [
      { path: "/", Component: AllTasks },
      { path: "importants", Component: ImporatantsTasks },
      { path: "/do-it-now", Component: DoItNow },
      { path: "Completed", Component: Completed },
      { path: "profil", Component: Profil },
    ],
  },
]);

const AppRoute = () => {
  return <RouterProvider router={routes} />;
};

export default AppRoute;
