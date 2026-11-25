import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import { showToast } from '../utils/toastHelper';
// TUGAS 13 - Modal menampilkan beban SKS dosen & total SKS mahasiswa
// sebagai petunjuk sebelum data disimpan dan divalidasi.
import {
    MAKS_SKS_DOSEN,
    MAKS_SKS_MAHASISWA,
    hitungSksDosen,
    hitungSksMahasiswa,
} from '../utils/kelasRules';

export default function KelasModal({
    isModalOpen, onClose, onSubmit, selectedKelas,
    matkulList = [], dosenList = [], mahasiswaList = [],
    kelasList = [],
}) {
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

    if (!isModalOpen) return null;

    const editingId = selectedKelas?.id ?? null;
    const sksTerpilih = Number(matkulList.find((m) => String(m.id) === String(form.matkulId))?.sks ?? 0);
    const bebanDosenTerpilih = form.dosenId
        ? hitungSksDosen(form.dosenId, kelasList, matkulList, editingId)
        : 0;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const toggleMahasiswa = (id) => {
        setForm((prev) => ({
            ...prev,
            mahasiswaIds: prev.mahasiswaIds.includes(id)
                ? prev.mahasiswaIds.filter((m) => m !== id)
                : [...prev.mahasiswaIds, id],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nama || !form.matkulId || !form.dosenId) {
            showToast.error("Nama kelas, mata kuliah, dan dosen wajib diisi!");
            return;
        }
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-1">{selectedKelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h3>
                <p className="text-xs text-gray-500 mb-4">
                    Aturan: 1 mata kuliah hanya 1 dosen, beban dosen maks {MAKS_SKS_DOSEN} SKS, total SKS mahasiswa maks {MAKS_SKS_MAHASISWA} SKS.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="nama">Nama Kelas</Label>
                        <Input id="nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Contoh: Kelas A - Basis Data" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="matkulId">Mata Kuliah</Label>
                        <select id="matkulId" name="matkulId" value={form.matkulId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Pilih Mata Kuliah --</option>
                            {matkulList.map((mk) => (
                                <option key={mk.id} value={mk.id}>{mk.nama} ({mk.sks} SKS)</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="dosenId">Dosen Pengampu</Label>
                        <select id="dosenId" name="dosenId" value={form.dosenId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Pilih Dosen --</option>
                            {dosenList.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nama} (beban saat ini {hitungSksDosen(d.id, kelasList, matkulList, editingId)}/{MAKS_SKS_DOSEN} SKS)
                                </option>
                            ))}
                        </select>
                        {form.dosenId && (
                            <p className="text-xs text-gray-500 mt-1">
                                Beban dosen terpilih saat ini {bebanDosenTerpilih} SKS
                                {sksTerpilih > 0 && `, menjadi ${bebanDosenTerpilih + sksTerpilih} SKS bila kelas ini disimpan (maks ${MAKS_SKS_DOSEN} SKS).`}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <Label>Mahasiswa di Kelas Ini</Label>
                        <div className="border border-gray-300 rounded p-3 max-h-44 overflow-y-auto space-y-2">
                            {mahasiswaList.map((mhs) => {
                                const totalSks = hitungSksMahasiswa(mhs.id, kelasList, matkulList, editingId);
                                return (
                                    <label key={mhs.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.mahasiswaIds.includes(String(mhs.id))}
                                            onChange={() => toggleMahasiswa(String(mhs.id))}
                                            className="w-4 h-4"
                                        />
                                        {mhs.nama} ({mhs.nim})
                                        <span className="text-xs text-gray-500">- total {totalSks}/{MAKS_SKS_MAHASISWA} SKS</span>
                                    </label>
                                );
                            })}
                            {mahasiswaList.length === 0 && <p className="text-sm text-gray-400">Belum ada data mahasiswa.</p>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{form.mahasiswaIds.length} mahasiswa dipilih.</p>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Batal</Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700">Simpan Data</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
