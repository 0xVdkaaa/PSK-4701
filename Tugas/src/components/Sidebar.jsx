import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toastHelper';
import Button from './Button';

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        showToast.success('Berhasil logout!');
        navigate('/');
    };

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen shadow-xl">
            {/* Header Sidebar */}
            <div className="p-6 flex items-center justify-center border-b border-gray-700">
                <h2 className="text-2xl font-extrabold text-blue-400">Admin<span className="text-white">Panel</span></h2>
            </div>

            {/* Menu Navigasi */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <Link 
                    to="/admin/dashboard" 
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-blue-600 hover:text-white font-medium"
                >
                    Dashboard
                </Link>
                <Link 
                    to="/admin/mahasiswa" 
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-blue-600 hover:text-white font-medium"
                >
                    Data Mahasiswa
                </Link>
                <Link 
                    to="/admin/dosen" 
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-blue-600 hover:text-white font-medium"
                >
                    Data Dosen
                </Link>
                <Link 
                    to="/admin/matkul" 
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-blue-600 hover:text-white font-medium"
                >
                    Mata Kuliah
                </Link>
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