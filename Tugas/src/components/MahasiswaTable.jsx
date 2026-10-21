import { Link } from 'react-router-dom';

// Menerima 3 props sesuai instruksi dosen: state mahasiswa, openEditModal, dan onDelete (handleDelete)
export default function MahasiswaTable({ mahasiswa, openEditModal, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-blue-800 text-white text-sm">
                        <th className="p-3 border-b">NIM</th>
                        <th className="p-3 border-b">Nama Lengkap</th>
                        <th className="p-3 border-b">Status</th>
                        <th className="p-3 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                    {mahasiswa.map((mhs) => (
                        <tr key={mhs.nim} className="hover:bg-gray-50">
                            <td className="p-3 border-b font-medium">{mhs.nim}</td>
                            <td className="p-3 border-b">{mhs.nama}</td>
                            <td className="p-3 border-b">
                                <span className={`px-2 py-1 rounded text-xs text-white ${mhs.status ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {mhs.status ? 'Aktif' : 'Non-Aktif'}
                                </span>
                            </td>
                            <td className="p-3 border-b">
                                <Link to={`/admin/mahasiswa/${mhs.nim}`} className="bg-blue-500 text-white px-3 py-1 rounded text-xs mr-1 hover:bg-blue-600 inline-block">Detail</Link>
                                {/* Panggil fungsi openEditModal dengan parameter mhs */}
                                <button onClick={() => openEditModal(mhs)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs mr-1 hover:bg-yellow-600">Edit</button>
                                {/* Panggil fungsi onDelete dengan parameter nim */}
                                <button onClick={() => onDelete(mhs.nim)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {mahasiswa.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">Belum ada data mahasiswa.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}