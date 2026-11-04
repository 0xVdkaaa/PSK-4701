import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Cek apakah user udah login (ada data di localStorage)
  const user = localStorage.getItem("user");
  
  if (!user) {
    // Kalau belum, tendang ke halaman login
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}