import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUser, updateUserRolePermission, deleteUser } from '../Apis/UserApi';

// TUGAS 10 - Hooks React Query untuk User.
// Dipakai halaman Manajemen User (Tugas 9) agar pola fetching-nya
// sama dengan halaman lain: lewat React Query, bukan useEffect manual.

export const useUserList = () =>
    useQuery({
        queryKey: ['user'],
        queryFn: async () => (await getAllUser()).data,
    });

// Update role & permission user (lanjutan Tugas 9)
export const useUpdateUserRolePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, role, permissions }) =>
            (await updateUserRolePermission(id, role, permissions)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => (await deleteUser(id)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    });
};
