import CustomerTable from "./component/Customer/CustomerTable";
import MainDrawer from "./component/MainDrawer";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ProductPage from "./component/Product/ProductPage";
import OrderTable from "./component/Orders/OrderTable";
import LoginPage from "./component/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainDrawer />,

    children: [
      {
        index: true,
        loader: async () => redirect("/customer"),
      },
      {
        path: "customer",
        element: <CustomerTable />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "order",
        element: <OrderTable />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
