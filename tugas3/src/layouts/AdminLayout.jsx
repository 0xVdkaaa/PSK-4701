import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
// ... import lain (kayak Header/Footer kalau ada)

export default function AdminLayout() { // <-- { children } nya dihapus
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-6">
                    <Outlet /> {/* <-- children diganti jadi Outlet */}
                </main>
            </div>
        </div>
    );
}