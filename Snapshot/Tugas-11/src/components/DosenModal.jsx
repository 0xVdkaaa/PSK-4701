import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import { showToast } from '../utils/toastHelper';

export default function DosenModal({ isModalOpen, onClose, onSubmit, selectedDosen }) {
    const [form, setForm] = useState({ nidn: '', nama: '', matkul: '' });

    useEffect(() => {
        if (selectedDosen) {
            setForm(selectedDosen);
        } else {
            setForm({ nidn: '', nama: '', matkul: '' });
        }
    }, [selectedDosen, isModalOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nidn.trim() || !form.nama.trim() || !form.matkul.trim()) {
            showToast.error("Semua field wajib diisi bos!");
            return;
        }
        onSubmit(form);
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-bold mb-4">{selectedDosen ? 'Edit Dosen' : 'Tambah Dosen'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="nidn">NIDN</Label>
                        <Input type="text" id="nidn" name="nidn" value={form.nidn} onChange={handleChange} placeholder="Masukkan NIDN" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="nama">Nama Dosen</Label>
                        <Input type="text" id="nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan Nama Dosen" />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="matkul">Mata Kuliah Pengampu</Label>
                        <Input type="text" id="matkul" name="matkul" value={form.matkul} onChange={handleChange} placeholder="Contoh: Pemrograman Web" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Batal</Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">Simpan Data</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}