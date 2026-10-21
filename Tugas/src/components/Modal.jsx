import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

export default function Modal({ isOpen, onClose, onSubmit, editData }) {
  // State form lokal
  const [formData, setFormData] = useState({ nim: "", nama: "", status: true });

  // Efek buat ngisi form otomatis kalau lagi mode Edit
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({ nim: "", nama: "", status: true });
    }
  }, [editData, isOpen]);

  // 1. EVENT HANDLING: handleChange buat nangkep perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 2. EVENT HANDLING: handleSubmit buat nahan refresh form dan ngirim data
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Kirim data ke Admin.jsx
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-bold mb-4">
          {editData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="nim">NIM</Label>
            <Input
              type="text"
              id="nim"
              name="nim"
              value={formData.nim}
              onChange={handleChange}
              placeholder="Masukkan NIM (contoh: A11.2020.13139)"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Lengkap"
            />
          </div>
          <div className="mb-6">
            <Label
              htmlFor="status"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">Status Mahasiswa Aktif</span>
            </Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Batal
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Simpan Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
