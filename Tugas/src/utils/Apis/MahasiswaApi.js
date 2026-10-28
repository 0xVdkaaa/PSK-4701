import AxiosInstance from "../AxiosInstance";

// Ambil semua mahasiswa
export const getAllMahasiswa = () => AxiosInstance.get("/mahasiswa");

// Ambil 1 mahasiswa berdasarkan id
export const getMahasiswa = (id) => AxiosInstance.get(`/mahasiswa/${id}`);

// Tambah mahasiswa baru
export const storeMahasiswa = (data) => AxiosInstance.post("/mahasiswa", data);

// Update data mahasiswa (berdasarkan id)
export const updateMahasiswa = (id, data) => AxiosInstance.put(`/mahasiswa/${id}`, data);

// Hapus mahasiswa (berdasarkan id)
export const deleteMahasiswa = (id) => AxiosInstance.delete(`/mahasiswa/${id}`);