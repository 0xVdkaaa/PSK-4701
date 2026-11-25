import {
    ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell,
    AreaChart, Area,
} from 'recharts';

// ============================================================
// TUGAS 12 - Kumpulan Chart untuk Dashboard (library Recharts).
// Semua data berasal dari API (diambil Dashboard lewat React
// Query), bukan data statis yang diketik manual.
// ============================================================

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed', '#0891b2', '#db2777', '#65a30d'];

const ChartCard = ({ title, children }) => (
    <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold mb-3">{title}</h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </div>
    </div>
);

// Chart 1 (Bar Chart): jumlah mahasiswa pada setiap kelas
export function ChartMahasiswaPerKelas({ kelas = [], matkulList = [] }) {
    const data = kelas.map((k) => {
        const matkul = matkulList.find((m) => String(m.id) === String(k.matkulId));
        return {
            nama: matkul ? matkul.nama : k.nama,
            jumlahMahasiswa: (k.mahasiswaIds ?? []).length,
        };
    });

    return (
        <ChartCard title="Jumlah Mahasiswa per Kelas (Bar Chart)">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="jumlahMahasiswa" name="Jumlah Mahasiswa" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    );
}

// Chart 2 (Pie Chart): komposisi status mahasiswa aktif vs tidak aktif
export function ChartStatusMahasiswa({ mahasiswa = [] }) {
    const data = [
        { name: 'Aktif', value: mahasiswa.filter((m) => m.status).length },
        { name: 'Tidak Aktif', value: mahasiswa.filter((m) => !m.status).length },
    ];

    return (
        <ChartCard title="Status Mahasiswa (Pie Chart)">
            <PieChart>
                <Tooltip />
                <Legend verticalAlign="top" />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="55%"
                    outerRadius={85}
                    label={({ name, value }) => `${name}: ${value}`}
                >
                    {data.map((entry, i) => (
                        <Cell key={entry.name} fill={i === 0 ? '#16a34a' : '#dc2626'} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    );
}

// Chart 3 (Area Chart): beban SKS setiap mata kuliah
export function ChartSksMatkul({ matkul = [] }) {
    const data = matkul.map((m) => ({ nama: m.nama, sks: Number(m.sks) || 0 }));

    return (
        <ChartCard title="SKS per Mata Kuliah (Area Chart)">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Area type="monotone" dataKey="sks" name="SKS" stroke="#7c3aed" fill="#c4b5fd" />
            </AreaChart>
        </ChartCard>
    );
}

// Chart 4 (Bar Chart tambahan): jumlah user berdasarkan role (data Tugas 9)
export function ChartUserPerRole({ users = [] }) {
    const roles = ['Admin', 'Operator', 'Viewer', 'Custom'];
    const data = roles
        .map((role) => ({ role, jumlah: users.filter((u) => (u.role ?? 'Custom') === role).length }))
        .filter((d) => d.jumlah > 0);

    return (
        <ChartCard title="User per Role (Bar Chart)">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="jumlah" name="Jumlah User" radius={[4, 4, 0, 0]}>
                    {data.map((entry, i) => (
                        <Cell key={entry.role} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ChartCard>
    );
}
