import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "@/app";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export function NonProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  if (user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}
