import { useState } from 'react';
import MatkulTable from '../components/MatkulTable';
import MatkulModal from '../components/MatkulModal';
import Button from '../components/Button';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
// TUGAS 10 - Fetching & mutasi sekarang lewat Hooks React Query di folder Utils
import {
    useMatkulList,
    useCreateMatkul,
    useUpdateMatkul,
    useDeleteMatkul,
} from '../utils/hooks/useMatkul';
import Pagination from '../components/Pagination';
import { usePagination } from '../utils/hooks/usePagination';

export default function Matkul() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMatkul, setSelectedMatkul] = useState(null);

    const { data: matkul = [], isLoading, isError } = useMatkulList();
    const pagination = usePagination(matkul, 5); // TUGAS 11 - Pagination
    const createMatkul = useCreateMatkul();
    const updateMatkul = useUpdateMatkul();
    const deleteMatkul = useDeleteMatkul();

    const handleSubmit = async (form) => {
        try {
            if (selectedMatkul) {
                const result = await confirmAlert('Update Data?', 'Yakin mau simpan perubahan ini?');
                if (!result.isConfirmed) return;
                await updateMatkul.mutateAsync({ id: selectedMatkul.id, data: form });
                showToast.success("Data berhasil diupdate!");
            } else {
                await createMatkul.mutateAsync(form);
                showToast.success("Data berhasil ditambahkan!");
            }
            setIsModalOpen(false);
        } catch (error) { showToast.error("Terjadi kesalahan."); }
    };

    const handleDelete = async (id) => {
        const result = await confirmAlert('Hapus Data?', 'Yakin mau hapus data ini?');
        if (result.isConfirmed) {
            try {
                await deleteMatkul.mutateAsync(id);
                showToast.success("Data berhasil dihapus!");
            } catch (error) { showToast.error("Gagal menghapus data."); }
        }
    };

    if (isLoading) return <p className="text-center mt-10">Memuat data mata kuliah...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Gagal mengambil data dari server!</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Daftar Mata Kuliah</h2>
                <Button onClick={() => { setSelectedMatkul(null); setIsModalOpen(true); }} className="bg-purple-600 hover:bg-purple-700">+ Tambah Matkul</Button>
            </div>
            <MatkulTable data={pagination.paginatedData} onEdit={(mk) => { setSelectedMatkul(mk); setIsModalOpen(true); }} onDelete={handleDelete} />
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                startIndex={pagination.startIndex}
                endIndex={pagination.endIndex}
                onPageChange={pagination.setCurrentPage}
                onItemsPerPageChange={pagination.changeItemsPerPage}
            />
            <MatkulModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} selectedMatkul={selectedMatkul} />
        </div>
    );
}
