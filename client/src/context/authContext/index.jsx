import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../notificationContext";
import instanceAxios from "../../config/axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const handleLogin = async (registerData) => {
    try {
      setIsLoading(true);
      const res = await instanceAxios.post("/auth/register", registerData);
      setCurrentUser(res.data.currentUser);
      showNotification("success", "Login Successfull");
    } catch (err) {
      console.log(err);
      setCurrentUser(null);
      showNotification("error", err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      setCurrentUser(null);
    } else {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, handleLogin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export { AuthContext };
