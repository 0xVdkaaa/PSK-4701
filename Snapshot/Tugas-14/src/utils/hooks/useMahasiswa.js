import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAllMahasiswa,
    getMahasiswa,
    storeMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
} from '../Apis/MahasiswaApi';

// ============================================================
// TUGAS 10 - Hooks React Query untuk Mahasiswa.
// Hooks di folder Utils ini menjadi penghubung antara Page
// dengan Apis: Page cukup memanggil hook, tidak lagi
// mengelola useEffect + useState untuk fetching manual.
// ============================================================

// Ambil semua data mahasiswa (GET /mahasiswa)
export const useMahasiswaList = () =>
    useQuery({
        queryKey: ['mahasiswa'],
        queryFn: async () => (await getAllMahasiswa()).data,
    });

// Ambil detail 1 mahasiswa (GET /mahasiswa/:id)
export const useMahasiswaDetail = (id) =>
    useQuery({
        queryKey: ['mahasiswa', id],
        queryFn: async () => (await getMahasiswa(id)).data,
        enabled: !!id,
    });

// Tambah mahasiswa baru (POST /mahasiswa)
export const useCreateMahasiswa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => (await storeMahasiswa(data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mahasiswa'] }),
    });
};

// Update mahasiswa (PUT /mahasiswa/:id)
export const useUpdateMahasiswa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => (await updateMahasiswa(id, data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mahasiswa'] }),
    });
};

// Hapus mahasiswa (DELETE /mahasiswa/:id)
export const useDeleteMahasiswa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => (await deleteMahasiswa(id)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mahasiswa'] }),
    });
};
