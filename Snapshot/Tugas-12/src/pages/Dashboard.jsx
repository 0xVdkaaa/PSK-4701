import { getCurrentUser } from '../utils/permissions';
// TUGAS 12 - Data statistik diambil dari API lewat hooks React Query (Tugas 10)
import { useMahasiswaList } from '../utils/hooks/useMahasiswa';
import { useDosenList } from '../utils/hooks/useDosen';
import { useMatkulList } from '../utils/hooks/useMatkul';
import { useKelasList } from '../utils/hooks/useKelas';
import { useUserList } from '../utils/hooks/useUser';
import {
    ChartMahasiswaPerKelas,
    ChartStatusMahasiswa,
    ChartSksMatkul,
    ChartUserPerRole,
} from '../components/DashboardCharts';

export default function Dashboard() {
    // TUGAS 9 - Tampilkan profil user yang login beserta role & permission-nya,
    // supaya efek perubahan role/permission langsung terlihat di dashboard.
    const currentUser = getCurrentUser();

    // TUGAS 12 - Seluruh angka & chart di dashboard berasal dari data API asli
    const { data: mahasiswa = [] } = useMahasiswaList();
    const { data: dosen = [] } = useDosenList();
    const { data: matkul = [] } = useMatkulList();
    const { data: kelas = [] } = useKelasList();
    const { data: users = [] } = useUserList();

    const stats = [
        { label: 'Total Mahasiswa', value: mahasiswa.length, color: 'bg-blue-600' },
        { label: 'Total Dosen', value: dosen.length, color: 'bg-green-600' },
        { label: 'Total Mata Kuliah', value: matkul.length, color: 'bg-purple-600' },
        { label: 'Total Kelas', value: kelas.length, color: 'bg-teal-600' },
    ];

    return (
        <div className="space-y-6">
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

            {/* TUGAS 12 - Kartu ringkasan jumlah data */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className={`${s.color} text-white rounded-lg p-4 shadow-sm`}>
                        <p className="text-sm opacity-90">{s.label}</p>
                        <p className="text-3xl font-bold">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* TUGAS 12 - Minimal 3 chart dari data API: bar, pie, dan area */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Statistik Akademik</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ChartMahasiswaPerKelas kelas={kelas} matkulList={matkul} />
                    <ChartStatusMahasiswa mahasiswa={mahasiswa} />
                    <ChartSksMatkul matkul={matkul} />
                    <ChartUserPerRole users={users} />
                </div>
                <p className="text-xs text-gray-400 mt-3">
                    Seluruh chart dihitung langsung dari data API (JSON Server) melalui React Query, sehingga berubah otomatis mengikuti data terbaru.
                </p>
            </div>
        </div>
    );
}
