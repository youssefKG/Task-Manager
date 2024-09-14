import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Layout from "./Layout";

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);
  return <Layout />;
};

export default PrivateRoute;
// return currentUser ? <Layout /> : <Navigate to="/login" />;
