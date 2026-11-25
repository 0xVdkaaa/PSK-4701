import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAllMatkul,
    storeMatkul,
    updateMatkul,
    deleteMatkul,
} from '../Apis/MatkulApi';

// TUGAS 10 - Hooks React Query untuk Mata Kuliah (penghubung Page <-> MatkulApi)

export const useMatkulList = () =>
    useQuery({
        queryKey: ['matkul'],
        queryFn: async () => (await getAllMatkul()).data,
    });

export const useCreateMatkul = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => (await storeMatkul(data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['matkul'] }),
    });
};

export const useUpdateMatkul = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => (await updateMatkul(id, data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['matkul'] }),
    });
};

export const useDeleteMatkul = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => (await deleteMatkul(id)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['matkul'] }),
    });
};
