import { NavLink, useNavigate } from 'react-router-dom';
import { confirmAlert } from '../utils/swalHelper';

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        confirmAlert('Logout', 'Yakin mau keluar dari aplikasi?', 'Ya, Logout!').then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                navigate('/');
            }
        });
    };

    return (
        <div className="w-64 bg-blue-800 text-white flex flex-col min-h-screen">
            <div className="p-6">
                <h2 className="text-2xl font-bold">Admin</h2>
            </div>
            <nav className="flex-1 mt-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink 
                            to="/admin/dashboard" 
                            className={({ isActive }) => 
                                `flex items-center px-6 py-3 hover:bg-blue-700 transition-colors ${isActive ? 'bg-blue-700 border-l-4 border-white' : ''}`
                            }
                        >
                            <span className="mr-3">📊</span> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/admin/mahasiswa" 
                            className={({ isActive }) => 
                                `flex items-center px-6 py-3 hover:bg-blue-700 transition-colors ${isActive ? 'bg-blue-700 border-l-4 border-white' : ''}`
                            }
                        >
                            <span className="mr-3">🎓</span> Mahasiswa
                        </NavLink>
                    </li>
                </ul>
            </nav>
            
            <div className="p-4 border-t border-blue-700">
                <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-bold transition-colors">
                    🚪 Logout
                </button>
            </div>
        </div>
    );
}