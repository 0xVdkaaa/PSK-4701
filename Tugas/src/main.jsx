import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- IMPORT TOAST WAJIB DI SINI
import './index.css';

import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mahasiswa from './pages/Mahasiswa';
import MahasiswaDetail from './pages/MahasiswaDetail';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user");
  if (!isLoggedIn) {
    return <Navigate to="/" />;
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
            path: ":nim",
            element: <MahasiswaDetail />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div className="flex h-screen items-center justify-center"><h1 className="text-2xl font-bold">404 - Halaman Tidak Ditemukan</h1></div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* WADAH TOAST BIAR NOTIFNYA BISA MUNCUL DI POJOK KANAN ATAS */}
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </React.StrictMode>
);