import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateLayout = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("current user", currentUser);
  }, [currentUser]);
  return currentUser ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateLayout;
