import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import DosenList from "@/pages/DosenList";
import DosenDetail from "@/pages/DosenDetail"; // <-- Ini yang baru ditambah
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* Rute Admin (Dilindungi) */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dosen" element={<DosenList />} />
            {/* INI RUTENYA BIAR GAK 404 LAGI BOS */}
            <Route path="dosen/:nidn" element={<DosenDetail />} />
          </Route>
        </Route>

        {/* Rute 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;