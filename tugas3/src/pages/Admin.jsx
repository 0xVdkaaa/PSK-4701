import { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function Admin() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AdminLayout title="Mahasiswa">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-700">Daftar Mahasiswa</h3>
                    <Button onClick={() => setIsModalOpen(true)}>+ Tambah Mahasiswa</Button>
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
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 border-b">A11.2020.13139</td>
                                <td className="p-3 border-b">Rizqy Akbar Dinul Putra</td>
                                <td className="p-3 border-b">
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded text-xs mr-1">Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">Hapus</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </AdminLayout>
    );
}