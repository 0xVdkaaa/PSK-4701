import { getCurrentUser } from '../utils/permissions';

export default function Dashboard() {
    // TUGAS 9 - Tampilkan profil user yang login beserta role & permission-nya,
    // supaya efek perubahan role/permission langsung terlihat di dashboard.
    const currentUser = getCurrentUser();

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>
            <p className="text-gray-600">Selamat datang di panel kontrol! Silakan pilih menu di samping.</p>

            {currentUser && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold mb-2">Profil Login</h3>
                    <p className="text-sm text-gray-600">Nama: {currentUser.name}</p>
                    <p className="text-sm text-gray-600">Email: {currentUser.email}</p>
                    <p className="text-sm text-gray-600 mb-3">
                        Role:{' '}
                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-semibold">
                            {currentUser.role ?? 'Belum diatur'}
                        </span>
                    </p>
                    <p className="font-semibold text-sm mb-1">
                        Permission yang dimiliki ({(currentUser.permissions ?? []).length}):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {(currentUser.permissions ?? []).map((perm) => (
                            <span key={perm} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
                                {perm}
                            </span>
                        ))}
                        {(currentUser.permissions ?? []).length === 0 && (
                            <span className="text-sm text-gray-400">Tidak ada permission.</span>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                        Menu di sidebar hanya menampilkan halaman yang permission-nya dimiliki user ini.
                    </p>
                </div>
            )}
        </div>
    );
}
