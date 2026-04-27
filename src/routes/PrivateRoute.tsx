import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const tokenAccess = localStorage.getItem("token");

  if (!tokenAccess) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
