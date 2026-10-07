import { Outlet } from 'react-router-dom';
// ... import lainnya kalau ada

export default function AuthLayout() { // <-- { children } nya dihapus
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Outlet /> {/* <-- children diganti jadi Outlet */}
        </div>
    );
}