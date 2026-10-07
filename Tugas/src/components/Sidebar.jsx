import { NavLink } from 'react-router-dom';

export default function Sidebar() {
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
        </div>
    );
}