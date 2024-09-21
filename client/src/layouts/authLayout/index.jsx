import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const AuthLayout = () => {
  const { currentUser } = useAuth();
  return currentUser === null ? <Outlet /> : <Navigate to="/" />;
};

export default AuthLayout;
