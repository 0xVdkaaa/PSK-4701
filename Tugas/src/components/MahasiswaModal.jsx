import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';

export default function MahasiswaModal({ isModalOpen, onClose, onSubmit, selectedMahasiswa }) {
    // 1. state form: form, setForm (Sesuai nama dari instruksi)
    const [form, setForm] = useState({ nim: '', nama: '', status: true });

    // 2. useEffect: ketika selectedMahasiswa ada maka setForm isi dengan detail selectedMahasiswa
    // sembari memanggil dependensi (selectedMahasiswa, isModalOpen)
    useEffect(() => {
        if (selectedMahasiswa) {
            setForm(selectedMahasiswa);
        } else {
            // ketika tidak ada (tambah baru), set null semua (dikosongkan)
            setForm({ nim: '', nama: '', status: true });
        }
    }, [selectedMahasiswa, isModalOpen]);

    // 3. handleChange: untuk form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // 4. handleSubmit: panggil onSubmit parameter state form lalu panggil onClose
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 5. Form validasi sederhana di dalam modal sebelum dikirim
        if (!form.nim.trim() || !form.nama.trim()) {
            alert("Validasi Gagal: NIM dan Nama tidak boleh kosong!");
            return;
        }

        onSubmit(form);
        onClose(); // Tutup modal setelah submit
    };

    // 6. tambahkan baris kondisi ketika isModalOpen false maka null
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-bold mb-4">{selectedMahasiswa ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="nim">NIM</Label>
                        <Input 
                            type="text" 
                            id="nim" 
                            name="nim" 
                            value={form.nim} 
                            onChange={handleChange} 
                            placeholder="Masukkan NIM" 
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="nama">Nama</Label>
                        <Input 
                            type="text" 
                            id="nama" 
                            name="nama" 
                            value={form.nama} 
                            onChange={handleChange} 
                            placeholder="Masukkan Nama Lengkap" 
                        />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="status" className="flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                id="status" 
                                name="status" 
                                checked={form.status} 
                                onChange={handleChange} 
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                            />
                            <span className="text-gray-700">Status Aktif</span>
                        </Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        {/* onClose dipanggil saat klik Batal */}
                        <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Batal</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Simpan Data</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}