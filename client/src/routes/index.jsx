import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "../layouts/defaultLayout";
import privateRoutes from "./privateRoutes";
import authRoutes from "./authRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [authRoutes, privateRoutes],
  },
]);

const AppRoute = () => {
  return <RouterProvider router={routes} />;
};

export default AppRoute;
