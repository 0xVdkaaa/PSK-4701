import { Link } from 'react-router-dom';
import Button from './Button';

export default function MahasiswaTable({ data = [], onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">NIM</th>
                        <th className="py-3 px-4 text-left">Nama Lengkap</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((mhs) => (
                        <tr key={mhs.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{mhs.nim}</td>
                            <td className="py-3 px-4">{mhs.nama}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded text-sm ${mhs.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {mhs.status ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                            </td>
                            <td className="py-3 px-4 flex space-x-2">
                                {/* Link Detail sekarang pakai mhs.id */}
                                <Link to={`/admin/mahasiswa/${mhs.id}`}>
                                    <Button type="button" className="bg-blue-500 hover:bg-blue-600 text-xs">Detail</Button>
                                </Link>
                                <Button type="button" onClick={() => onEdit(mhs)} className="bg-yellow-500 hover:bg-yellow-600 text-xs">Edit</Button>
                                {/* Tombol hapus sekarang lempar mhs.id */}
                                <Button type="button" onClick={() => onDelete(mhs.id)} className="bg-red-500 hover:bg-red-600 text-xs">Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}