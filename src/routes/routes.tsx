import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export const routes = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/dashboard" Component={Dashboard}/>
    </Routes>
  );
};

export default routes;
