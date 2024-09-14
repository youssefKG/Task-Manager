import React from "react";
import GlobalContextProvider from "./context/GlobalContext";
import AppRoute from "./routes";

function App() {
  return (
    <GlobalContextProvider>
      <AppRoute />
    </GlobalContextProvider>
  );
}

export default App;
