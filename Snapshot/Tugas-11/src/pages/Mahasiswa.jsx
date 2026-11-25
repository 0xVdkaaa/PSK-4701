import { useState } from 'react';
import MahasiswaTable from '../components/MahasiswaTable';
import MahasiswaModal from '../components/MahasiswaModal';
import Button from '../components/Button';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
// TUGAS 10 - Fetching & mutasi sekarang lewat Hooks React Query di folder Utils
import {
    useMahasiswaList,
    useCreateMahasiswa,
    useUpdateMahasiswa,
    useDeleteMahasiswa,
} from '../utils/hooks/useMahasiswa';
import Pagination from '../components/Pagination';
import { usePagination } from '../utils/hooks/usePagination';

export default function Mahasiswa() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

    // useQuery menggantikan useEffect + useState untuk mengambil data
    const { data: mahasiswa = [], isLoading, isError } = useMahasiswaList();
    const pagination = usePagination(mahasiswa, 5); // TUGAS 11 - Pagination
    const createMahasiswa = useCreateMahasiswa();
    const updateMahasiswa = useUpdateMahasiswa();
    const deleteMahasiswa = useDeleteMahasiswa();

    const handleAdd = () => {
        setSelectedMahasiswa(null);
        setIsModalOpen(true);
    };

    const handleEdit = (mhs) => {
        setSelectedMahasiswa(mhs);
        setIsModalOpen(true);
    };

    const handleSubmit = async (form) => {
        try {
            if (selectedMahasiswa) {
                const result = await confirmAlert('Update Data?', 'Yakin mau simpan perubahan ini?');
                if (!result.isConfirmed) return;
                await updateMahasiswa.mutateAsync({ id: selectedMahasiswa.id, data: form });
                showToast.success("Data berhasil diupdate!");
            } else {
                await createMahasiswa.mutateAsync(form);
                showToast.success("Data berhasil ditambahkan!");
            }
            setIsModalOpen(false);
            // Tabel otomatis refresh karena query ['mahasiswa'] di-invalidate mutation
        } catch (error) {
            showToast.error("Terjadi kesalahan saat menyimpan data.");
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmAlert('Hapus Data?', 'Yakin mau hapus data ini?');
        if (result.isConfirmed) {
            try {
                await deleteMahasiswa.mutateAsync(id);
                showToast.success("Data berhasil dihapus!");
            } catch (error) {
                showToast.error("Gagal menghapus data.");
            }
        }
    };

    if (isLoading) return <p className="text-center mt-10">Memuat data mahasiswa...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Gagal mengambil data dari server!</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Daftar Mahasiswa</h2>
                <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">+ Tambah Data</Button>
            </div>
            <MahasiswaTable data={pagination.paginatedData} onEdit={handleEdit} onDelete={handleDelete} />
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
            <MahasiswaModal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                selectedMahasiswa={selectedMahasiswa}
            />
        </div>
    );
}
