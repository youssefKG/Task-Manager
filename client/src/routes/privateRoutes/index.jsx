import PrivateLayout from "../../layouts/PrivateLayout";
import AllTasks from "../../pages/AllTasks";
import ImportantsTasks from "../../pages/ImportantsTasks";
import DoItNow from "../../pages/DoItNow";
import Profil from "../../pages/Profil";
import Completed from "../../pages/Completed";

const privateRoutes = {
  path: "/",
  Component: PrivateLayout,
  children: [
    { path: "/", Component: AllTasks },
    { path: "importants", Component: ImportantsTasks },
    { path: "/do-it-now", Component: DoItNow },
    { path: "Completed", Component: Completed },
    { path: "profil", Component: Profil },
  ],
};

export default privateRoutes;
