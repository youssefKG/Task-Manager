import { createContext, useContext, useState } from "react";
import NotificationContextProvider from "../notificationContext";
import AuthContextProvider from "../authContext";
import TasksContextProvider from "../taskContextProvider";

const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    const newThemeValue = theme === "dark" ? "light" : "dark";
    setTheme(newThemeValue);
  };

  return (
    <GlobalContext.Provider value={{ theme, toggleTheme }}>
      <NotificationContextProvider>
        <AuthContextProvider>
          <TasksContextProvider>{children}</TasksContextProvider>
        </AuthContextProvider>
      </NotificationContextProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
export { GlobalContext };
