import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function Admin() {
    // STATE sesuai instruksi dosen
    const [isModalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    
    // State mahasiswa awal berupa Array JSON dengan field status
    const [mahasiswa, setMahasiswa] = useState([
        { nim: 'A11.2020.13139', nama: 'Rizqy Akbar Dinul Putra', status: true }
    ]);

    // Fungsi klik Simpan dari Modal
    const handleSave = (data) => {
        // VALIDASI 1: Data kurang terisi
        if (!data.nim.trim() || !data.nama.trim()) {
            alert("Validasi Gagal: NIM dan Nama tidak boleh kosong!");
            return;
        }

        // Cek apakah NIM sudah ada
        const isNimExists = mahasiswa.find(m => m.nim === data.nim);

        if (editData) {
            // VALIDASI 2: Nim unique (Saat Edit)
            if (isNimExists && isNimExists.nim !== editData.nim) {
                alert("Validasi Gagal: NIM sudah terdaftar pada mahasiswa lain!");
                return;
            }
            // VALIDASI 3: Konfirmasi ketika update
            if (window.confirm("Apakah Anda yakin ingin memperbarui data mahasiswa ini?")) {
                setMahasiswa(mahasiswa.map(m => m.nim === editData.nim ? data : m));
                setModalOpen(false);
                setEditData(null);
            }
        } else {
            // VALIDASI 2: Nim unique (Saat Tambah Baru)
            if (isNimExists) {
                alert("Validasi Gagal: NIM sudah terdaftar! Gunakan NIM lain.");
                return;
            }
            // Tambah data baru ke state
            setMahasiswa([...mahasiswa, data]);
            setModalOpen(false);
        }
    };

    const handleAdd = () => {
        setEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (mhs) => {
        setEditData(mhs);
        setModalOpen(true);
    };

    const handleDelete = (nim) => {
        // VALIDASI 3: Konfirmasi ketika delete
        if (window.confirm("Peringatan: Yakin ingin menghapus data mahasiswa ini secara permanen?")) {
            setMahasiswa(mahasiswa.filter(m => m.nim !== nim));
        }
    };

    return (
        <>
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-700">Daftar Mahasiswa</h3>
                    <Button onClick={handleAdd}>+ Tambah Data</Button>
                </div>
                
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
                                        <button onClick={() => handleEdit(mhs)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs mr-1 hover:bg-yellow-600">Edit</button>
                                        <button onClick={() => handleDelete(mhs.nim)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Hapus</button>
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
            </Card>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => { setModalOpen(false); setEditData(null); }} 
                onSubmit={handleSave}
                editData={editData}
            />
        </>
    );
}