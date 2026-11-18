import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Modal } from "@/components/Modal";

export default function DosenList() {
  const [dosen, setDosen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // State buat bonus search
  const navigate = useNavigate();

  // State buat Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ nidn: "", nama: "", mataKuliah: "", status: "Aktif" });
  const [error, setError] = useState("");

  // Ambil data dengan delay 500ms (Syarat UTS)
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedData = JSON.parse(localStorage.getItem("dosenData")) || [];
      setDosen(savedData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi simpan ke localStorage
  const saveToLocal = (data) => {
    localStorage.setItem("dosenData", JSON.stringify(data));
    setDosen(data);
  };

  // Fungsi buka Modal (Bisa buat Tambah atau Edit)
  const handleOpenModal = (editData = null) => {
    setError("");
    if (editData) {
      setIsEdit(true);
      setFormData(editData);
    } else {
      setIsEdit(false);
      setFormData({ nidn: "", nama: "", mataKuliah: "", status: "Aktif" });
    }
    setIsModalOpen(true);
  };

  // Fungsi Submit (Validasi NIDN 10 digit & No Duplicate)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.nidn.length !== 10 || isNaN(formData.nidn)) {
      setError("NIDN wajib 10 digit angka!");
      return;
    }

    if (!isEdit && dosen.some((d) => d.nidn === formData.nidn)) {
      setError("NIDN sudah terdaftar!");
      return;
    }

    let newData;
    if (isEdit) {
      newData = dosen.map((d) => (d.nidn === formData.nidn ? formData : d));
    } else {
      newData = [...dosen, formData];
    }

    saveToLocal(newData);
    setIsModalOpen(false);
  };

  // Fungsi Hapus (Validasi Aktif dilarang hapus)
  const handleDelete = (d) => {
    if (d.status === "Aktif") return; // Pencegahan ganda
    
    if (window.confirm(`Yakin ingin menghapus dosen ${d.nama}?`)) {
      const newData = dosen.filter((item) => item.nidn !== d.nidn);
      saveToLocal(newData);
    }
  };

  // Logika Bonus +5 Poin: Filter pencarian langsung saat ngetik
  const filteredDosen = dosen.filter((d) => 
    d.nama.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center py-20 text-gray-500 animate-pulse font-medium">Memuat data dosen...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Daftar Dosen</h1>
        <Button onClick={() => handleOpenModal()}>+ Tambah Dosen</Button>
      </div>

      {/* Input Pencarian (Bonus +5 Poin) */}
      <div className="mb-6 max-w-md">
        <Input 
          placeholder="Cari nama dosen..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid Kartu Dosen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDosen.map((d) => (
          <Card key={d.nidn} className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{d.nama}</h3>
                  <p className="text-sm text-gray-500">NIDN: {d.nidn}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-md ${d.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                  {d.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-6">{d.mataKuliah}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate(`/admin/dosen/${d.nidn}`)} className="flex-1 !bg-blue-600 hover:!bg-blue-700">Detail</Button>
              <Button onClick={() => handleOpenModal(d)} className="flex-1 !bg-amber-500 hover:!bg-amber-600">Edit</Button>
              <Button 
                onClick={() => handleDelete(d)} 
                disabled={d.status === "Aktif"} 
                className={`flex-1 ${d.status === "Aktif" ? "!bg-gray-300 cursor-not-allowed text-gray-500" : "!bg-red-600 hover:!bg-red-700"}`}
              >
                Hapus
              </Button>
            </div>
          </Card>
        ))}
        {filteredDosen.length === 0 && (
          <div className="col-span-2 text-center py-10 text-gray-500">Data dosen tidak ditemukan.</div>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEdit ? "Edit Dosen" : "Tambah Dosen"}>
        {error && <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-sm font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>NIDN</Label>
            <Input 
              value={formData.nidn} 
              onChange={(e) => setFormData({...formData, nidn: e.target.value})} 
              placeholder="Masukkan 10 digit NIDN"
              readOnly={isEdit}
              className={isEdit ? "bg-gray-100 cursor-not-allowed" : ""}
            />
          </div>
          <div>
            <Label>Nama</Label>
            <Input 
              value={formData.nama} 
              onChange={(e) => setFormData({...formData, nama: e.target.value})} 
              placeholder="Masukkan nama"
              required
            />
          </div>
          <div>
            <Label>Mata Kuliah</Label>
            <Input 
              value={formData.mataKuliah} 
              onChange={(e) => setFormData({...formData, mataKuliah: e.target.value})} 
              placeholder="Masukkan mata kuliah"
              required
            />
          </div>
          <div>
            <Label>Status</Label>
            {/* Ganti fuchsia dengan warna tema asli lu bos! */}
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            >
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end mt-6">
            <Button type="button" onClick={() => setIsModalOpen(false)} className="!bg-gray-500 hover:!bg-gray-600">Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}