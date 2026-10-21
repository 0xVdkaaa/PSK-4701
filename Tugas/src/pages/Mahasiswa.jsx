import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import MahasiswaTable from '../components/MahasiswaTable';
import MahasiswaModal from '../components/MahasiswaModal';
import { confirmAlert } from '../utils/swalHelper'; 
import { showToast } from '../utils/toastHelper'; 

export default function Mahasiswa() {
    const [mahasiswa, setMahasiswa] = useState([
        { nim: 'A11.2020.13139', nama: 'Rizqy Akbar Dinul Putra', status: true }
    ]);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const storeMahasiswa = (data) => {
        const isNimExists = mahasiswa.find(m => m.nim === data.nim);
        if (isNimExists) {
            showToast.error("NIM sudah terdaftar! Gunakan NIM lain."); 
            return;
        }
        setMahasiswa([...mahasiswa, data]);
        showToast.success("Data mahasiswa berhasil ditambahkan!"); 
    };

    const updateMahasiswa = (data) => {
        const isNimExists = mahasiswa.find(m => m.nim === data.nim);
        if (isNimExists && isNimExists.nim !== selectedMahasiswa.nim) {
            showToast.error("NIM sudah terdaftar pada mahasiswa lain!"); 
            return;
        }
        
        confirmAlert('Simpan Perubahan?', 'Apakah Anda yakin ingin memperbarui data mahasiswa ini?', 'Ya, Simpan!').then((result) => {
            if (result.isConfirmed) {
                setMahasiswa(mahasiswa.map(m => m.nim === selectedMahasiswa.nim ? data : m));
                showToast.success("Data berhasil diupdate!"); 
                setModalOpen(false);
                setSelectedMahasiswa(null);
            }
        });
    };

    const deleteMahasiswa = (nim) => {
        setMahasiswa(mahasiswa.filter(m => m.nim !== nim));
    };

    const openAddModal = () => {
        setModalOpen(true);
        setSelectedMahasiswa(null);
    };

    const openEditModal = (mhs) => {
        setModalOpen(true);
        setSelectedMahasiswa(mhs);
    };

    const handleSubmit = (data) => {
        if (selectedMahasiswa) {
            updateMahasiswa(data);
        } else {
            storeMahasiswa(data);
            setModalOpen(false);
            setSelectedMahasiswa(null);
        }
    };

    const handleDelete = (nim) => {
        confirmAlert('Hapus Data?', 'Yakin ingin menghapus data mahasiswa ini secara permanen?', 'Ya, Hapus!').then((result) => {
            if (result.isConfirmed) {
                deleteMahasiswa(nim);
                showToast.success("Data mahasiswa berhasil dihapus!"); 
            } else {
                showToast.error("Penghapusan dibatalkan."); 
            }
        });
    };

    return (
        <>
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-700">Daftar Mahasiswa</h3>
                    <Button onClick={openAddModal}>+ Tambah Data</Button>
                </div>
                
                <MahasiswaTable 
                    mahasiswa={mahasiswa} 
                    openEditModal={openEditModal} 
                    onDelete={handleDelete} 
                />
            </Card>

            <MahasiswaModal 
                isModalOpen={isModalOpen} 
                onClose={() => { setModalOpen(false); setSelectedMahasiswa(null); }} 
                onSubmit={handleSubmit}
                selectedMahasiswa={selectedMahasiswa}
            />
        </>
    );
}