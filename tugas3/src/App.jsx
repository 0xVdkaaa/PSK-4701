import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

// Komponen buat ngecek tiket login (Protected Route)
const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        return <Navigate to="/" />; // Tendang balik ke login
    }
    return children; // Boleh masuk kalau ada tiket
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route buat Login, dibungkus AuthLayout */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Login />} />
                </Route>

                {/* Route buat Admin, dibungkus AdminLayout dan dikunci ProtectedRoute */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} /> {/* Rute default: /admin */}
                    <Route path="mahasiswa" element={<Admin />} /> {/* Rute: /admin/mahasiswa */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}