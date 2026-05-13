import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreatePatient from "../pages/CreatePatient";
import EditPatient from "../pages/EditPatient";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import Home from "../pages/HomePage";
import CreateAppointment from "../pages/CreateAppointment";
import Appointments from "../pages/Appointments";
import EditAppointments from "../pages/EditAppointments";
import PatientRecord from "../pages/PatientRecord";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";

export const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/me"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />

      <Route
        path="/appointments/new"
        element={
          <PrivateRoute>
            <CreateAppointment />
          </PrivateRoute>
        }
      />

      <Route
        path="/appointments/edit"
        element={
          <PrivateRoute>
            <EditAppointments />
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

      <Route
        path="/patient/record"
        element={
          <PrivateRoute>
            <PatientRecord />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default routes;
