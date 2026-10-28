import { useState, useEffect } from 'react';
import MatkulTable from '../components/MatkulTable';
import MatkulModal from '../components/MatkulModal';
import Button from '../components/Button';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
import { getAllMatkul, storeMatkul, updateMatkul, deleteMatkul } from '../utils/Apis/MatkulApi';

export default function Matkul() {
    const [matkul, setMatkul] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMatkul, setSelectedMatkul] = useState(null);

    const fetchMatkul = async () => {
        try {
            const res = await getAllMatkul();
            setMatkul(res.data);
        } catch (error) {
            showToast.error("Gagal mengambil data dari server!");
        }
    };

    useEffect(() => { fetchMatkul(); }, []);

    const handleSubmit = async (form) => {
        try {
            if (selectedMatkul) {
                const result = await confirmAlert('Update Data?', 'Yakin mau simpan perubahan ini?');
                if (result.isConfirmed) {
                    await updateMatkul(selectedMatkul.id, form);
                    showToast.success("Data berhasil diupdate!");
                } else return;
            } else {
                await storeMatkul(form);
                showToast.success("Data berhasil ditambahkan!");
            }
            setIsModalOpen(false);
            fetchMatkul();
        } catch (error) { showToast.error("Terjadi kesalahan."); }
    };

    const handleDelete = async (id) => {
        const result = await confirmAlert('Hapus Data?', 'Yakin mau hapus data ini?');
        if (result.isConfirmed) {
            try {
                await deleteMatkul(id);
                showToast.success("Data berhasil dihapus!");
                fetchMatkul();
            } catch (error) { showToast.error("Gagal menghapus data."); }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Daftar Mata Kuliah</h2>
                <Button onClick={() => { setSelectedMatkul(null); setIsModalOpen(true); }} className="bg-purple-600 hover:bg-purple-700">+ Tambah Matkul</Button>
            </div>
            <MatkulTable data={matkul} onEdit={(mk) => { setSelectedMatkul(mk); setIsModalOpen(true); }} onDelete={handleDelete} />
            <MatkulModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} selectedMatkul={selectedMatkul} />
        </div>
    );
}