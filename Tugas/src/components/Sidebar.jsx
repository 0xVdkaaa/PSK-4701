import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toastHelper';
import { getCurrentUser, hasPermission } from '../utils/permissions';
import Button from './Button';

export default function Sidebar() {
    const navigate = useNavigate();
    // TUGAS 9 - Menu sidebar disesuaikan dengan permission user yang login
    const currentUser = getCurrentUser();

    const handleLogout = () => {
        localStorage.removeItem('user');
        showToast.success('Berhasil logout!');
        navigate('/');
    };

    // Daftar menu beserta permission yang dibutuhkan untuk melihatnya
    const menus = [
        { to: '/admin/dashboard', label: 'Dashboard', permission: null },
        { to: '/admin/mahasiswa', label: 'Data Mahasiswa', permission: 'mahasiswa.view' },
        { to: '/admin/dosen', label: 'Data Dosen', permission: 'dosen.view' },
        { to: '/admin/matkul', label: 'Mata Kuliah', permission: 'matkul.view' },
        { to: '/admin/kelas', label: 'Kelas', permission: 'kelas.view' },
        { to: '/admin/user', label: 'Manajemen User', permission: 'user.view' },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen shadow-xl">
            {/* Header Sidebar */}
            <div className="p-6 flex items-center justify-center border-b border-gray-700">
                <h2 className="text-2xl font-extrabold text-blue-400">Admin<span className="text-white">Panel</span></h2>
            </div>

            {/* Info user yang login + role-nya (Tugas 9) */}
            {currentUser && (
                <div className="px-6 py-4 border-b border-gray-700">
                    <p className="font-semibold">{currentUser.name}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-blue-600 text-xs font-semibold">
                        Role: {currentUser.role ?? 'Belum diatur'}
                    </span>
                </div>
            )}

            {/* Menu Navigasi - hanya menu yang permission-nya dimiliki user */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menus
                    .filter((menu) => !menu.permission || hasPermission(currentUser, menu.permission))
                    .map((menu) => (
                        <Link
                            key={menu.to}
                            to={menu.to}
                            className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-blue-600 hover:text-white font-medium"
                        >
                            {menu.label}
                        </Link>
                    ))}
            </nav>

            {/* Tombol Logout di Bawah */}
            <div className="p-4 border-t border-gray-700">
                <Button 
                    onClick={handleLogout} 
                    className="w-full bg-red-600 hover:bg-red-700 py-2.5 font-bold rounded-lg transition duration-200"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}