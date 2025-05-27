import { useAuth } from "@clerk/clerk-react"; // o tu sistema de auth
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Cargando...</div>;

  if (!isSignedIn ) return <Navigate to="/" replace />;

  return <Outlet />;
}

