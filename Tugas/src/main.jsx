import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- IMPORT TOAST WAJIB DI SINI
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // TUGAS 10 - React Query
import './index.css';

import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mahasiswa from './pages/Mahasiswa';
import MahasiswaDetail from './pages/MahasiswaDetail';
import Dosen from './pages/Dosen';
import Matkul from './pages/Matkul';
import Kelas from './pages/Kelas';
import User from './pages/User';
import { getCurrentUser, hasPermission } from './utils/permissions';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user");
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

// TUGAS 9 - Route yang dikunci permission tertentu.
// User tanpa permission akan diarahkan kembali ke dashboard.
const PermissionRoute = ({ permission, children }) => {
  const currentUser = getCurrentUser();
  if (!hasPermission(currentUser, permission)) {
    return <Navigate to="/admin/dashboard" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
    path: "/register",
    element: <Register />,
  },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />,
          },
          {
            path: ":id", 
            element: <MahasiswaDetail />,
          },
        ],
      },
      {
        path: "dosen",
        element: <Dosen />,
      },
      {
        path: "matkul",
        element: <Matkul />,
      },
      {
        // TUGAS 10 - Halaman Kelas (CRUD lewat React Query)
        path: "kelas",
        element: <Kelas />,
      },
      {
        // TUGAS 9 - Halaman Manajemen User (ubah Role & Permission),
        // hanya bisa dibuka user dengan permission user.view
        path: "user",
        element: (
          <PermissionRoute permission="user.view">
            <User />
          </PermissionRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <div className="flex h-screen items-center justify-center"><h1 className="text-2xl font-bold">404 - Halaman Tidak Ditemukan</h1></div>,
  },
]);

// TUGAS 10 - QueryClient untuk React Query: mengatur cache data API
// di seluruh aplikasi. staleTime 30 detik = data dianggap segar 30 detik,
// jadi pindah halaman tidak selalu menembak API ulang.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* WADAH TOAST BIAR NOTIFNYA BISA MUNCUL DI POJOK KANAN ATAS */}
    <Toaster position="top-right" />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);