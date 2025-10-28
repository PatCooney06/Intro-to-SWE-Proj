import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
