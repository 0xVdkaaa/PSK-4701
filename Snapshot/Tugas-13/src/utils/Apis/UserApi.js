import AxiosInstance from "../AxiosInstance";

// Ambil semua user
export const getAllUser = () => AxiosInstance.get("/user");

// Ambil 1 user berdasarkan id
export const getUser = (id) => AxiosInstance.get(`/user/${id}`);

// Tambah user baru
export const storeUser = (data) => AxiosInstance.post("/user", data);

// Update data user (berdasarkan id)
export const updateUser = (id, data) => AxiosInstance.put(`/user/${id}`, data);

// TUGAS 9 - Update khusus Role & Permission user.
// Data user yang lama diambil dulu supaya field lain
// (name, email, password) tidak ikut hilang saat PUT.
export const updateUserRolePermission = async (id, role, permissions) => {
    const res = await AxiosInstance.get(`/user/${id}`);
    const updated = { ...res.data, role, permissions };
    return AxiosInstance.put(`/user/${id}`, updated);
};

// Hapus user (berdasarkan id)
export const deleteUser = (id) => AxiosInstance.delete(`/user/${id}`);
