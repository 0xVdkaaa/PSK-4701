import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Fungsi buat styling menu yang lagi aktif
  const navClass = ({ isActive }) =>
    isActive
      ? "bg-fuchsia-800 text-white px-3 py-2 rounded-md font-medium"
      : "text-fuchsia-100 hover:bg-fuchsia-700 hover:text-white px-3 py-2 rounded-md font-medium transition";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar Atas */}
      <nav className="bg-fuchsia-600 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-white text-xl font-bold mr-6">ADMIN-13139</span>
            <NavLink to="/admin/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/dosen" className={navClass}>
              Dosen
            </NavLink>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-fuchsia-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Area Konten Dinamis */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white text-center p-4 text-sm text-gray-500 shadow-inner mt-auto">
        &copy; 2026 ADMIN-13139
      </footer>
    </div>
  );
}