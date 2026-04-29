import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreatePatient from "../pages/CreatePatient";
import EditPatient from "../pages/EditPatient";

export const routes = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/patient/new"
        element={
          <PrivateRoute>
            <CreatePatient />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/edit"
        element={
          <PrivateRoute>
            <EditPatient />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default routes;
