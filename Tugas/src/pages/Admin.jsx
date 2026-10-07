import { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link buat pindah halaman
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function Admin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    
    const [students, setStudents] = useState([
        { id: 1, nim: 'A11.2020.13139', nama: 'Rizqy Akbar Dinul Putra' }
    ]);

    const handleSave = (data) => {
        if (editData) {
            setStudents(students.map(s => s.id === editData.id ? { ...s, nim: data.nim, nama: data.nama } : s));
        } else {
            const newStudent = { id: Date.now(), nim: data.nim, nama: data.nama };
            setStudents([...students, newStudent]);
        }
        setIsModalOpen(false);
        setEditData(null);
    };

    const handleAdd = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (student) => {
        setEditData(student);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Yakin mau hapus data ini?");
        if (confirmDelete) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    return (
        <>
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
                                        {/* Tambahan tombol Detail */}
                                        <Link to={`/admin/mahasiswa/${student.nim}`} className="bg-blue-500 text-white px-3 py-1 rounded text-xs mr-1 hover:bg-blue-600 inline-block">Detail</Link>
                                        <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs mr-1 hover:bg-yellow-600">Edit</button>
                                        <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Hapus</button>
                                    </td>
                                </tr>
                            ))}
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
        </>
    );
}