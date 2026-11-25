import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAllKelas,
    getKelas,
    storeKelas,
    updateKelas,
    deleteKelas,
} from '../Apis/KelasApi';

// TUGAS 10 - Hooks React Query untuk Kelas (penghubung Page <-> KelasApi)

export const useKelasList = () =>
    useQuery({
        queryKey: ['kelas'],
        queryFn: async () => (await getAllKelas()).data,
    });

export const useKelasDetail = (id) =>
    useQuery({
        queryKey: ['kelas', id],
        queryFn: async () => (await getKelas(id)).data,
        enabled: !!id,
    });

export const useCreateKelas = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => (await storeKelas(data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kelas'] }),
    });
};

export const useUpdateKelas = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => (await updateKelas(id, data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kelas'] }),
    });
};

export const useDeleteKelas = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => (await deleteKelas(id)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kelas'] }),
    });
};
