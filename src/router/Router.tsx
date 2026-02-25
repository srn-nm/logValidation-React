import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";
import ErrorElement from "../components/ErrorElement";
import LoginPage from "../pages/LoginPage"
import Dashboard from "../pages/Dashboard";
import SchemaValidation from "../pages/SchemaValidation"
import DataDetail from "../pages/DataDetail";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: <PrivateRoute />, 
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "Dashboard",
            element: <Dashboard />,
          },
          {
            path: "SchemaValidation",
            element: <SchemaValidation />,
            children: [
              {
                path: "data/detail/:id",
                element: <DataDetail />
              }
            ]
          },
         
        ],
      },
    ],
  },
]);

export default router;
