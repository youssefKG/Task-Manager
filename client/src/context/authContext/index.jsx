import { createContext, useState, useContext, useEffect } from "react";
import { useNotification } from "../notificationContext";
import { useNavigate } from "react-router-dom";
import authService from "../../api/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const loginSubmit = async (loginFormData, _) => {
    try {
      setIsLoginLoading(true);
      const res = await authService.login(loginFormData);
      showNotification("success", res.message);
      setCurrentUser(res.result);

      localStorage.setItem("currentUser", JSON.stringify(res.result));

      navigate("/");
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const registerSubmit = async (registerFormData, _) => {
    try {
      setIsRegisterLoading(true);
      const res = await authService.register(registerFormData);
      showNotification("error", res.message);
      navigate("/login");
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const logoutSubmit = async () => {
    try {
      setIsLogoutLoading(true);
      localStorage.removeItem("currentUser");
    } catch (error) {
      showNotification(error.message);
    } finally {
      setIsLogoutLoading(false);
    }
  };

  useEffect(() => {
    const fetchLocalStorage = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
          setCurrentUser(null);
        } else {
          setCurrentUser(user);
        }
        setIsReady(true);
      } catch (err) {
        setIsReady(false);
      }
    };
    fetchLocalStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginSubmit,
        registerSubmit,
        logoutSubmit,
        isRegisterLoading,
        isLoginLoading,
        isLogoutLoading,
      }}
    >
      {isReady && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext };
