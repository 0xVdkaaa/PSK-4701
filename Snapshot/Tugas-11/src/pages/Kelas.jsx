import { useState } from 'react';
import KelasTable from '../components/KelasTable';
import KelasModal from '../components/KelasModal';
import Button from '../components/Button';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
// TUGAS 10 - Page tidak lagi fetch manual, tapi memakai Hooks React Query
import { useKelasList, useCreateKelas, useUpdateKelas, useDeleteKelas } from '../utils/hooks/useKelas';
import { useMatkulList } from '../utils/hooks/useMatkul';
import { useDosenList } from '../utils/hooks/useDosen';
import { useMahasiswaList } from '../utils/hooks/useMahasiswa';
import Pagination from '../components/Pagination';
import { usePagination } from '../utils/hooks/usePagination';

export default function Kelas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKelas, setSelectedKelas] = useState(null);

    // Data diambil lewat React Query (cache + refetch otomatis)
    const { data: kelas = [], isLoading, isError } = useKelasList();
    const { data: matkulList = [] } = useMatkulList();
    const { data: dosenList = [] } = useDosenList();
    const { data: mahasiswaList = [] } = useMahasiswaList();

    const pagination = usePagination(kelas, 5); // TUGAS 11 - Pagination
    const createKelas = useCreateKelas();
    const updateKelas = useUpdateKelas();
    const deleteKelas = useDeleteKelas();

    const handleAdd = () => {
        setSelectedKelas(null);
        setIsModalOpen(true);
    };

    const handleEdit = (kelas) => {
        setSelectedKelas(kelas);
        setIsModalOpen(true);
    };

    const handleSubmit = async (form) => {
        try {
            if (selectedKelas) {
                const result = await confirmAlert('Update Data?', 'Yakin mau simpan perubahan ini?');
                if (!result.isConfirmed) return;
                await updateKelas.mutateAsync({ id: selectedKelas.id, data: form });
                showToast.success("Data kelas berhasil diupdate!");
            } else {
                await createKelas.mutateAsync(form);
                showToast.success("Data kelas berhasil ditambahkan!");
            }
            setIsModalOpen(false);
            // Tidak perlu fetch manual: mutation meng-invalidate query ['kelas'],
            // React Query otomatis mengambil ulang data terbaru.
        } catch (error) {
            showToast.error("Terjadi kesalahan saat menyimpan data kelas.");
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmAlert('Hapus Data?', 'Yakin mau hapus kelas ini?');
        if (result.isConfirmed) {
            try {
                await deleteKelas.mutateAsync(id);
                showToast.success("Data kelas berhasil dihapus!");
            } catch (error) {
                showToast.error("Gagal menghapus data kelas.");
            }
        }
    };

    if (isLoading) return <p className="text-center mt-10">Memuat data kelas...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Gagal mengambil data kelas dari server!</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Daftar Kelas</h2>
                <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700">+ Tambah Kelas</Button>
            </div>
            <KelasTable data={pagination.paginatedData} matkulList={matkulList} dosenList={dosenList} onEdit={handleEdit} onDelete={handleDelete} />
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
            <KelasModal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                selectedKelas={selectedKelas}
                matkulList={matkulList}
                dosenList={dosenList}
                mahasiswaList={mahasiswaList}
            />
        </div>
    );
}
