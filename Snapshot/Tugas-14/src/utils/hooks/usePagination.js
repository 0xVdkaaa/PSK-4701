import { useState, useMemo, useEffect } from 'react';

// ============================================================
// TUGAS 11 - Hook Pagination (client-side).
// Memotong array data menjadi halaman-halaman kecil supaya
// tabel tidak menampilkan semua data sekaligus.
// ============================================================
export const usePagination = (data = [], initialItemsPerPage = 5) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Kalau data menyusut (misalnya setelah hapus) dan halaman saat ini
    // melebihi jumlah halaman, mundur ke halaman terakhir yang valid.
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    // Data untuk halaman yang sedang aktif saja
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    // Info "Menampilkan X–Y dari Z data"
    const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const changeItemsPerPage = (count) => {
        setItemsPerPage(count);
        setCurrentPage(1); // Balik ke halaman pertama setiap ganti jumlah per halaman
    };

    return {
        paginatedData,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        startIndex,
        endIndex,
        setCurrentPage: goToPage,
        nextPage: () => goToPage(currentPage + 1),
        prevPage: () => goToPage(currentPage - 1),
        changeItemsPerPage,
    };
};
