import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";
import ErrorElement from "../components/ErrorElement";
import LoginPage from "../pages/LoginPage"
import Dashboard from "../pages/Dashboard";
import DataValidation from "../pages/DataValidation"
import SchemaValidation from "../pages/SchemaValidation"

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
            path: "DataValidation",
            element: <DataValidation />,
          },
          {
            path: "SchemaValidation",
            element: <SchemaValidation />,
          },
         
        ],
      },
    ],
  },
]);

export default router;
