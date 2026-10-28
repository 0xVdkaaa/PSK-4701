import { useState, useEffect } from 'react';
import DosenTable from '../components/DosenTable';
import DosenModal from '../components/DosenModal';
import Button from '../components/Button';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
import { getAllDosen, storeDosen, updateDosen, deleteDosen } from '../utils/Apis/DosenApi';

export default function Dosen() {
    const [dosen, setDosen] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDosen, setSelectedDosen] = useState(null);

    const fetchDosen = async () => {
        try {
            const res = await getAllDosen();
            setDosen(res.data);
        } catch (error) {
            showToast.error("Gagal mengambil data dosen dari server!");
        }
    };

    useEffect(() => {
        fetchDosen();
    }, []);

    const handleAdd = () => {
        setSelectedDosen(null);
        setIsModalOpen(true);
    };

    const handleEdit = (dsn) => {
        setSelectedDosen(dsn);
        setIsModalOpen(true);
    };

    const handleSubmit = async (form) => {
        try {
            if (selectedDosen) {
                const result = await confirmAlert('Update Data?', 'Yakin mau simpan perubahan ini?');
                if (result.isConfirmed) {
                    await updateDosen(selectedDosen.id, form);
                    showToast.success("Data dosen berhasil diupdate!");
                    setIsModalOpen(false);
                    fetchDosen();
                }
            } else {
                await storeDosen(form);
                showToast.success("Data dosen berhasil ditambahkan!");
                setIsModalOpen(false);
                fetchDosen();
            }
        } catch (error) {
            showToast.error("Terjadi kesalahan saat menyimpan data dosen.");
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmAlert('Hapus Data?', 'Yakin mau hapus dosen ini?');
        if (result.isConfirmed) {
            try {
                await deleteDosen(id);
                showToast.success("Data dosen berhasil dihapus!");
                fetchDosen();
            } catch (error) {
                showToast.error("Gagal menghapus data dosen.");
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Daftar Dosen</h2>
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">+ Tambah Dosen</Button>
            </div>
            <DosenTable data={dosen} onEdit={handleEdit} onDelete={handleDelete} />
            <DosenModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} selectedDosen={selectedDosen} />
        </div>
    );
}