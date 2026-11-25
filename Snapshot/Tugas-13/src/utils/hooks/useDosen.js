import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAllDosen,
    getDosen,
    storeDosen,
    updateDosen,
    deleteDosen,
} from '../Apis/DosenApi';

// TUGAS 10 - Hooks React Query untuk Dosen (penghubung Page <-> DosenApi)

export const useDosenList = () =>
    useQuery({
        queryKey: ['dosen'],
        queryFn: async () => (await getAllDosen()).data,
    });

export const useDosenDetail = (id) =>
    useQuery({
        queryKey: ['dosen', id],
        queryFn: async () => (await getDosen(id)).data,
        enabled: !!id,
    });

export const useCreateDosen = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => (await storeDosen(data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dosen'] }),
    });
};

export const useUpdateDosen = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => (await updateDosen(id, data)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dosen'] }),
    });
};

export const useDeleteDosen = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => (await deleteDosen(id)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dosen'] }),
    });
};
