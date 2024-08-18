import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";
import { Navigate } from "@tanstack/react-router";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);

  if (token) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
