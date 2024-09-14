import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const NotificationContext = createContext(null);

const NotificationContextProvider = ({ children }) => {
  const showNotification = (type, message) => {
    toast[type](message);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer autoClose={4000} draggable={true} position="top-center" />
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
export { NotificationContext };
