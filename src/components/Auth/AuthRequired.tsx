
import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface AuthRequiredProps {
  children: React.ReactNode;
}

export const AuthRequired = ({ children }: AuthRequiredProps) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
