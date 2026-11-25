import Button from './Button';
// TUGAS 13 - Tabel kelas menampilkan SKS mata kuliah dan beban SKS dosen
import { MAKS_SKS_DOSEN, hitungSksDosen } from '../utils/kelasRules';

export default function KelasTable({ data = [], matkulList = [], dosenList = [], kelasList = [], onEdit, onDelete }) {
    const namaMatkul = (id) => matkulList.find((m) => String(m.id) === String(id))?.nama ?? '-';
    const sksMatkul = (id) => matkulList.find((m) => String(m.id) === String(id))?.sks ?? '-';
    const namaDosen = (id) => dosenList.find((d) => String(d.id) === String(id))?.nama ?? '-';

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-teal-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Nama Kelas</th>
                        <th className="py-3 px-4 text-left">Mata Kuliah</th>
                        <th className="py-3 px-4 text-left">SKS</th>
                        <th className="py-3 px-4 text-left">Dosen Pengampu</th>
                        <th className="py-3 px-4 text-left">Beban Dosen</th>
                        <th className="py-3 px-4 text-left">Jumlah Mahasiswa</th>
                        <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((kelas) => (
                        <tr key={kelas.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{kelas.nama}</td>
                            <td className="py-3 px-4">{namaMatkul(kelas.matkulId)}</td>
                            <td className="py-3 px-4">{sksMatkul(kelas.matkulId)} SKS</td>
                            <td className="py-3 px-4">{namaDosen(kelas.dosenId)}</td>
                            <td className="py-3 px-4">{hitungSksDosen(kelas.dosenId, kelasList, matkulList)}/{MAKS_SKS_DOSEN} SKS</td>
                            <td className="py-3 px-4">{(kelas.mahasiswaIds ?? []).length} mahasiswa</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <Button onClick={() => onEdit(kelas)} className="bg-yellow-500 hover:bg-yellow-600 text-xs">Edit</Button>
                                <Button onClick={() => onDelete(kelas.id)} className="bg-red-500 hover:bg-red-600 text-xs">Hapus</Button>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr><td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada data kelas.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
