import { createBrowserRouter } from "react-router-dom";
import { Search } from "./pages/Search";
import Detalle from "./pages/Detalle";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />
  },
  {
    path: "/search",
    element: <Detalle />,
  },
]);

export default router;