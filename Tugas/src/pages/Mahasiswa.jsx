import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import MahasiswaTable from '../components/MahasiswaTable';
import MahasiswaModal from '../components/MahasiswaModal';

export default function Mahasiswa() {
    // 1. STATE WAJIB DARI DOSEN
    const [mahasiswa, setMahasiswa] = useState([
        { nim: 'A11.2020.13139', nama: 'Rizqy Akbar Dinul Putra', status: true }
    ]);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    // 2. storeMahasiswa: tambah mahasiswa baru ke state mahasiswa
    const storeMahasiswa = (data) => {
        // Cek NIM Unique
        const isNimExists = mahasiswa.find(m => m.nim === data.nim);
        if (isNimExists) {
            alert("Validasi Gagal: NIM sudah terdaftar! Gunakan NIM lain.");
            return;
        }
        setMahasiswa([...mahasiswa, data]);
    };

    // 3. updateMahasiswa: update mahasiswa dengan nim dari state mahasiswa
    const updateMahasiswa = (data) => {
        const isNimExists = mahasiswa.find(m => m.nim === data.nim);
        if (isNimExists && isNimExists.nim !== selectedMahasiswa.nim) {
            alert("Validasi Gagal: NIM sudah terdaftar pada mahasiswa lain!");
            return;
        }
        if (window.confirm("Apakah Anda yakin ingin memperbarui data mahasiswa ini?")) {
            setMahasiswa(mahasiswa.map(m => m.nim === selectedMahasiswa.nim ? data : m));
        }
    };

    // 4. deleteMahasiswa: delete mahasiswa dengan nim dari state mahasiswa
    const deleteMahasiswa = (nim) => {
        setMahasiswa(mahasiswa.filter(m => m.nim !== nim));
    };

    // 5. openAddModal: set true pada state modal, set null pada state selected mahasiswa
    const openAddModal = () => {
        setModalOpen(true);
        setSelectedMahasiswa(null);
    };

    // 6. openEditModal: set true pada state modal, set objek mahasiswa pada state selected mahasiswa dari parameter
    const openEditModal = (mhs) => {
        setModalOpen(true);
        setSelectedMahasiswa(mhs);
    };

    // 7. handleSubmit: kondisi ketika set selected mahasiswa terisi maka update, ketika tidak maka tambah baris baru
    const handleSubmit = (data) => {
        if (selectedMahasiswa) {
            updateMahasiswa(data);
        } else {
            storeMahasiswa(data);
        }
    };

    // 8. handleDelete: menerima parameter nim mahasiswa untuk dipassing ke deleteMahasiswa
    const handleDelete = (nim) => {
        if (window.confirm("Peringatan: Yakin ingin menghapus data mahasiswa ini secara permanen?")) {
            deleteMahasiswa(nim);
        }
    };

    return (
        <>
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-700">Daftar Mahasiswa</h3>
                    <Button onClick={openAddModal}>+ Tambah Data</Button>
                </div>
                
                {/* 9. Memanggil komponen MahasiswaTable dengan passing props */}
                <MahasiswaTable 
                    mahasiswa={mahasiswa} 
                    openEditModal={openEditModal} 
                    onDelete={handleDelete} 
                />
            </Card>

            {/* 10. Memanggil komponen MahasiswaModal dengan passing props */}
            <MahasiswaModal 
                isModalOpen={isModalOpen} 
                onClose={() => { setModalOpen(false); setSelectedMahasiswa(null); }} 
                onSubmit={handleSubmit}
                selectedMahasiswa={selectedMahasiswa}
            />
        </>
    );
}