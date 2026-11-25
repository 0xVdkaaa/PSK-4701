import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import { showToast } from '../utils/toastHelper';

export default function KelasModal({ isModalOpen, onClose, onSubmit, selectedKelas, matkulList = [], dosenList = [], mahasiswaList = [] }) {
    const [form, setForm] = useState({ nama: '', matkulId: '', dosenId: '', mahasiswaIds: [] });

    useEffect(() => {
        if (selectedKelas) {
            setForm({
                nama: selectedKelas.nama ?? '',
                matkulId: String(selectedKelas.matkulId ?? ''),
                dosenId: String(selectedKelas.dosenId ?? ''),
                mahasiswaIds: (selectedKelas.mahasiswaIds ?? []).map(String),
            });
        } else {
            setForm({ nama: '', matkulId: '', dosenId: '', mahasiswaIds: [] });
        }
    }, [selectedKelas, isModalOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleMahasiswaChange = (id, checked) => {
        setForm((prev) => ({
            ...prev,
            mahasiswaIds: checked
                ? [...prev.mahasiswaIds, id]
                : prev.mahasiswaIds.filter((m) => m !== id),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nama.trim() || !form.matkulId || !form.dosenId) {
            showToast.error("Nama kelas, mata kuliah, dan dosen wajib diisi bos!");
            return;
        }
        onSubmit(form);
    };

    if (!isModalOpen) return null;

    const selectClass = "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">{selectedKelas ? 'Edit Kelas' : 'Tambah Kelas'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="nama">Nama Kelas</Label>
                        <Input type="text" id="nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Contoh: Kelas A - Pemrograman Sisi Klien" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="matkulId">Mata Kuliah</Label>
                        <select id="matkulId" name="matkulId" value={form.matkulId} onChange={handleChange} className={selectClass}>
                            <option value="">-- Pilih Mata Kuliah --</option>
                            {matkulList.map((m) => (
                                <option key={m.id} value={m.id}>{m.nama} ({m.sks} SKS)</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="dosenId">Dosen Pengampu</Label>
                        <select id="dosenId" name="dosenId" value={form.dosenId} onChange={handleChange} className={selectClass}>
                            <option value="">-- Pilih Dosen --</option>
                            {dosenList.map((d) => (
                                <option key={d.id} value={d.id}>{d.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <Label>Mahasiswa di Kelas Ini</Label>
                        <div className="border border-gray-200 rounded-lg p-3 space-y-1.5 max-h-40 overflow-y-auto">
                            {mahasiswaList.map((mhs) => (
                                <label key={mhs.id} className="flex items-center space-x-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.mahasiswaIds.includes(String(mhs.id))}
                                        onChange={(e) => handleMahasiswaChange(String(mhs.id), e.target.checked)}
                                        className="w-4 h-4 accent-teal-600"
                                    />
                                    <span>{mhs.nama} ({mhs.nim})</span>
                                </label>
                            ))}
                            {mahasiswaList.length === 0 && <p className="text-sm text-gray-400">Tidak ada data mahasiswa.</p>}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Batal</Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700">Simpan Data</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
