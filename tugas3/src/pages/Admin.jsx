import { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function Admin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    
    // Data default tabel mahasiswa
    const [students, setStudents] = useState([
        { id: 1, nim: 'A11.2020.13139', nama: 'Rizqy Akbar Dinul Putra' }
    ]);

    // Fungsi klik Simpan (Berlaku buat Tambah Baru sekaligus Edit)
    const handleSave = (data) => {
        if (editData) {
            // Kalau lagi mode edit, update data yang id-nya cocok
            setStudents(students.map(s => s.id === editData.id ? { ...s, nim: data.nim, nama: data.nama } : s));
        } else {
            // Kalau mode tambah baru, masukin ke array paling bawah
            const newStudent = { id: Date.now(), nim: data.nim, nama: data.nama };
            setStudents([...students, newStudent]);
        }
        setIsModalOpen(false);
        setEditData(null);
    };

    // Fungsi klik tombol Tambah
    const handleAdd = () => {
        setEditData(null); // Kosongin form
        setIsModalOpen(true);
    };

    // Fungsi klik tombol Edit di tabel
    const handleEdit = (student) => {
        setEditData(student); // Lempar data ke form
        setIsModalOpen(true);
    };

    // Fungsi klik tombol Hapus di tabel
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Yakin mau hapus data ini?");
        if (confirmDelete) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    return (
        <AdminLayout title="Mahasiswa">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-700">Daftar Mahasiswa</h3>
                    <Button onClick={handleAdd}>+ Tambah Mahasiswa</Button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-800 text-white text-sm">
                                <th className="p-3 border-b">NIM</th>
                                <th className="p-3 border-b">Nama</th>
                                <th className="p-3 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{student.nim}</td>
                                    <td className="p-3 border-b">{student.nama}</td>
                                    <td className="p-3 border-b">
                                        <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs mr-1 hover:bg-yellow-600">Edit</button>
                                        <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {/* Muncul kalau semua data dihapus */}
                            {students.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center p-4 text-gray-500">Belum ada data mahasiswa.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => { setIsModalOpen(false); setEditData(null); }} 
                onSave={handleSave}
                editData={editData}
            />
        </AdminLayout>
    );
}