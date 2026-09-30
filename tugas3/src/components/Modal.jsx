import { useState, useEffect } from 'react';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import Form from './Form';

export default function Modal({ isOpen, onClose, onSave, editData }) {
    const [nim, setNim] = useState('');
    const [nama, setNama] = useState('');

    // Efek ini jalan otomatis: kalau klik edit, form keisi data. Kalau tambah baru, form kosong.
    useEffect(() => {
        if (editData) {
            setNim(editData.nim);
            setNama(editData.nama);
        } else {
            setNim('');
            setNama('');
        }
    }, [editData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ nim, nama }); // Kirim data ke Admin.jsx
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">{editData ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</h3>
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl font-bold">&times;</button>
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="nim">NIM</Label>
                        <Input id="nim" type="text" placeholder="Masukkan NIM" value={nim} onChange={(e) => setNim(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="nama">Nama</Label>
                        <Input id="nama" type="text" placeholder="Masukkan Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Batal</Button>
                        <Button type="submit">Simpan</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}