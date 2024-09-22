import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext(null);

const NotificationContextProvider = ({ children }) => {
  const showNotification = (type, message) => {
    console.log("show notification ", message);
    toast[type](message);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer
        style={{ color: "white" }}
        position="top-center"
        draggable
        autoClose={3000}
        theme="colored"
      />
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;

export const useNotification = () => {
  return useContext(NotificationContext);
};
export { NotificationContext };
