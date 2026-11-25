import { useState } from 'react';
import DosenTable from '../components/DosenTable';
import DosenModal from '../components/DosenModal';
import Button from '../components/Button';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
// TUGAS 10 - Fetching & mutasi sekarang lewat Hooks React Query di folder Utils
import {
    useDosenList,
    useCreateDosen,
    useUpdateDosen,
    useDeleteDosen,
} from '../utils/hooks/useDosen';

export default function Dosen() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDosen, setSelectedDosen] = useState(null);

    const { data: dosen = [], isLoading, isError } = useDosenList();
    const createDosen = useCreateDosen();
    const updateDosen = useUpdateDosen();
    const deleteDosen = useDeleteDosen();

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
                if (!result.isConfirmed) return;
                await updateDosen.mutateAsync({ id: selectedDosen.id, data: form });
                showToast.success("Data dosen berhasil diupdate!");
            } else {
                await createDosen.mutateAsync(form);
                showToast.success("Data dosen berhasil ditambahkan!");
            }
            setIsModalOpen(false);
        } catch (error) {
            showToast.error("Terjadi kesalahan saat menyimpan data dosen.");
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmAlert('Hapus Data?', 'Yakin mau hapus dosen ini?');
        if (result.isConfirmed) {
            try {
                await deleteDosen.mutateAsync(id);
                showToast.success("Data dosen berhasil dihapus!");
            } catch (error) {
                showToast.error("Gagal menghapus data dosen.");
            }
        }
    };

    if (isLoading) return <p className="text-center mt-10">Memuat data dosen...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Gagal mengambil data dosen dari server!</p>;

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
