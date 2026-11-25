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
// TUGAS 13 - Aturan pengelolaan kelas & perhitungan SKS
import {
    MAKS_SKS_MAHASISWA,
    hitungSksMahasiswa,
    validasiKelas,
} from '../utils/kelasRules';

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
        // TUGAS 13 - Validasi aturan kelas sebelum data dikirim ke server:
        // 1 matkul hanya 1 dosen, beban dosen maks 12 SKS, total SKS
        // mahasiswa maks 24 SKS. Bila melanggar, tampilkan pesan dan
        // batalkan penyimpanan (modal tetap terbuka).
        const error = validasiKelas(
            form, kelas, matkulList, dosenList, mahasiswaList,
            selectedKelas?.id ?? null
        );
        if (error) {
            showToast.error(error, { duration: 6000 });
            return;
        }

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

    // TUGAS 13 - Rekap SKS: total SKS yang sudah diambil setiap mahasiswa
    const rekapMahasiswa = mahasiswaList.map((mhs) => {
        const kelasDiikuti = kelas.filter((k) => (k.mahasiswaIds ?? []).map(String).includes(String(mhs.id)));
        const totalSks = hitungSksMahasiswa(mhs.id, kelas, matkulList);
        return { ...mhs, jumlahKelas: kelasDiikuti.length, totalSks };
    }).filter((mhs) => mhs.jumlahKelas > 0);

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold">Daftar Kelas</h2>
                    <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700">+ Tambah Kelas</Button>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                    Pengelolaan kelas: setiap kelas memilih satu mata kuliah, satu dosen pengampu, dan mahasiswa pesertanya.
                    Satu mata kuliah hanya boleh memiliki satu dosen, beban dosen maksimal 12 SKS, dan total SKS mahasiswa maksimal {MAKS_SKS_MAHASISWA} SKS.
                </p>
                <KelasTable data={pagination.paginatedData} matkulList={matkulList} dosenList={dosenList} kelasList={kelas} onEdit={handleEdit} onDelete={handleDelete} />
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
                    kelasList={kelas}
                />
            </div>

            {/* TUGAS 13 - Tabel rekap total SKS yang sudah diambil mahasiswa */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Rekap SKS Mahasiswa</h3>
                <p className="text-gray-500 text-sm mb-4">
                    Total SKS yang sudah diambil setiap mahasiswa dari seluruh kelas yang diikutinya (maksimal {MAKS_SKS_MAHASISWA} SKS).
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-teal-700 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">NIM</th>
                                <th className="py-3 px-4 text-left">Nama Mahasiswa</th>
                                <th className="py-3 px-4 text-left">Jumlah Kelas</th>
                                <th className="py-3 px-4 text-left">Total SKS Diambil</th>
                                <th className="py-3 px-4 text-left">Sisa Kuota SKS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rekapMahasiswa.map((mhs) => (
                                <tr key={mhs.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{mhs.nim}</td>
                                    <td className="py-3 px-4 font-medium">{mhs.nama}</td>
                                    <td className="py-3 px-4">{mhs.jumlahKelas} kelas</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-700 font-semibold">
                                            {mhs.totalSks} / {MAKS_SKS_MAHASISWA} SKS
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{MAKS_SKS_MAHASISWA - mhs.totalSks} SKS</td>
                                </tr>
                            ))}
                            {rekapMahasiswa.length === 0 && (
                                <tr><td colSpan="5" className="py-4 text-center text-gray-500">Belum ada mahasiswa yang terdaftar di kelas.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
