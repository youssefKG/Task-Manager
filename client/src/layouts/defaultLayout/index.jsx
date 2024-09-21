import { Outlet } from "react-router-dom";
import GlobalContextProvider from "../../context/GlobalContext";

const DefaultLayout = () => {
  return (
    <GlobalContextProvider>
      <Outlet />
    </GlobalContextProvider>
  );
};

export default DefaultLayout;
