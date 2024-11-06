import { createBrowserRouter } from "react-router-dom";
import { Search } from "./pages/Search";
import Detalle, { DetalleLoader } from "./pages/Detalle";
import Producto from "./pages/Producto";
import { ProductLoader, ProductAction } from "./pages/Producto";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />
  },
  {
    path: "/search",
    element: <Detalle />,
    loader: DetalleLoader
  },
  {
    path: "/producto/:id",
    element: <Producto />,
    action: ProductAction,
    loader: ProductLoader
  }
]);

export default router;