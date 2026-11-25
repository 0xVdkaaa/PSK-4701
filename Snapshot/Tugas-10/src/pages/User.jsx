import { useState } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import { confirmAlert } from '../utils/swalHelper';
import { showToast } from '../utils/toastHelper';
import { getCurrentUser } from '../utils/permissions';
// TUGAS 10 - Data user sekarang diambil & diubah lewat Hooks React Query
import { useUserList, useUpdateUserRolePermission, useDeleteUser } from '../utils/hooks/useUser';

// Halaman Manajemen User (Tugas 9): daftar semua user beserta role-nya,
// dan admin bisa mengubah Role & Permission tiap user lewat modal.
export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: users = [], isLoading, isError } = useUserList();
    const updateRolePermission = useUpdateUserRolePermission();
    const deleteUserMutation = useDeleteUser();

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Simpan perubahan Role & Permission ke server lewat mutation React Query
    const handleSubmit = async ({ role, permissions }) => {
        const result = await confirmAlert(
            'Ubah Role & Permission?',
            `Role ${selectedUser.name} akan diubah menjadi ${role} dengan ${permissions.length} hak akses.`
        );
        if (!result.isConfirmed) return;

        try {
            const updated = await updateRolePermission.mutateAsync({
                id: selectedUser.id,
                role,
                permissions,
            });

            // Kalau user yang diubah adalah user yang sedang login,
            // perbarui juga data login-nya di localStorage supaya
            // permission barunya langsung berlaku tanpa login ulang.
            const currentUser = getCurrentUser();
            if (currentUser && String(currentUser.id) === String(selectedUser.id)) {
                localStorage.setItem('user', JSON.stringify(updated));
            }

            showToast.success(`Role & permission ${selectedUser.name} berhasil diubah!`);
            setIsModalOpen(false);
            // Tabel otomatis refresh: query ['user'] di-invalidate oleh mutation
        } catch (error) {
            showToast.error("Terjadi kesalahan saat menyimpan perubahan.");
        }
    };

    const handleDelete = async (id) => {
        const currentUser = getCurrentUser();
        if (currentUser && String(currentUser.id) === String(id)) {
            showToast.error("Tidak bisa menghapus user yang sedang login!");
            return;
        }
        const result = await confirmAlert('Hapus User?', 'Yakin mau hapus user ini?');
        if (result.isConfirmed) {
            try {
                await deleteUserMutation.mutateAsync(id);
                showToast.success("User berhasil dihapus!");
            } catch (error) {
                showToast.error("Gagal menghapus user.");
            }
        }
    };

    if (isLoading) return <p className="text-center mt-10">Memuat data user...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Gagal mengambil data user dari server!</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">Manajemen User</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">
                Atur role dan hak akses (permission) setiap user yang terdaftar. Perubahan langsung tersimpan ke server dan menu di sidebar menyesuaikan permission user yang login.
            </p>
            <UserTable data={users} onEdit={handleEdit} onDelete={handleDelete} />
            <UserModal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                selectedUser={selectedUser}
            />
        </div>
    );
}
