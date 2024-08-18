import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";
import { Navigate } from "@tanstack/react-router";
import { ReactNode } from "react";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: "USER" | "ADMIN";
}) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
  const roleSaved = localStorage.getItem(LOCAL_STORAGE_KEY.ROLE);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (role === "USER" && roleSaved !== "USER") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "ADMIN" && roleSaved !== "ADMIN") {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
