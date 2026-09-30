export default function Sidebar() {
    return (
        <aside className="w-64 bg-blue-900 text-white flex-shrink-0 min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin</h1>
            </div>
            <nav className="mt-2 text-sm">
                <a href="#" className="block py-3 px-6 hover:bg-blue-800 flex items-center">📊 Dashboard</a>
                <a href="#" className="block py-3 px-6 bg-blue-800 flex items-center">🎓 Mahasiswa</a>
            </nav>
        </aside>
    );
}