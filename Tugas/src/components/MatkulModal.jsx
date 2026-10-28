import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import { showToast } from '../utils/toastHelper';

export default function MatkulModal({ isModalOpen, onClose, onSubmit, selectedMatkul }) {
    const [form, setForm] = useState({ kode: '', nama: '', sks: '' });

    useEffect(() => {
        if (selectedMatkul) setForm(selectedMatkul);
        else setForm({ kode: '', nama: '', sks: '' });
    }, [selectedMatkul, isModalOpen]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.kode || !form.nama || !form.sks) {
            return showToast.error("Semua field wajib diisi bos!");
        }
        onSubmit(form);
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-bold mb-4">{selectedMatkul ? 'Edit Matkul' : 'Tambah Matkul'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="kode">Kode Matkul</Label>
                        <Input type="text" id="kode" name="kode" value={form.kode} onChange={handleChange} placeholder="Contoh: PSK4701" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="nama">Nama Mata Kuliah</Label>
                        <Input type="text" id="nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Contoh: Pemrograman Web" />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="sks">SKS</Label>
                        <Input type="number" id="sks" name="sks" value={form.sks} onChange={handleChange} placeholder="Contoh: 3" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Batal</Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Simpan</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}