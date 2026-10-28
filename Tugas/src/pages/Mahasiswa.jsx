import { useState, useEffect } from 'react';
import MahasiswaTable from '../components/MahasiswaTable';
import MahasiswaModal from '../components/MahasiswaModal';
import Button from '../components/Button';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
import { 
    getAllMahasiswa, 
    storeMahasiswa, 
    updateMahasiswa, 
    deleteMahasiswa 
} from '../utils/Apis/MahasiswaApi'; // Import API Mahasiswa

export default function Mahasiswa() {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

    // Ambil data dari API
    const fetchMahasiswa = async () => {
        try {
            const res = await getAllMahasiswa();
            setMahasiswa(res.data);
        } catch (error) {
            showToast.error("Gagal mengambil data dari server!");
        }
    };

    // Jalankan fetch saat komponen pertama kali dirender
    useEffect(() => {
        fetchMahasiswa();
    }, []);

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
                if (result.isConfirmed) {
                    await updateMahasiswa(selectedMahasiswa.id, form); // Pakai .id sesuai JSON Server
                    showToast.success("Data berhasil diupdate!");
                    setIsModalOpen(false);
                    fetchMahasiswa(); // Refresh tabel
                }
            } else {
                await storeMahasiswa(form);
                showToast.success("Data berhasil ditambahkan!");
                setIsModalOpen(false);
                fetchMahasiswa(); // Refresh tabel
            }
        } catch (error) {
            showToast.error("Terjadi kesalahan saat menyimpan data.");
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmAlert('Hapus Data?', 'Yakin mau hapus data ini?');
        if (result.isConfirmed) {
            try {
                await deleteMahasiswa(id); // Hapus berdasarkan id
                showToast.success("Data berhasil dihapus!");
                fetchMahasiswa(); // Refresh tabel
            } catch (error) {
                showToast.error("Gagal menghapus data.");
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Daftar Mahasiswa</h2>
                <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">+ Tambah Data</Button>
            </div>
            {/* Lempar data ke tabel */}
            <MahasiswaTable data={mahasiswa} onEdit={handleEdit} onDelete={handleDelete} />
            <MahasiswaModal 
                isModalOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleSubmit} 
                selectedMahasiswa={selectedMahasiswa} 
            />
        </div>
    );
}