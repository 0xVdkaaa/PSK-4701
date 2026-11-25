// ============================================================
// TUGAS 11 - Komponen Pagination reusable.
// Dipakai bersama hook usePagination di semua halaman tabel:
// Mahasiswa, Dosen, Mata Kuliah, Kelas, dan Manajemen User.
// ============================================================
export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    onPageChange,
    onItemsPerPageChange,
}) {
    if (totalItems === 0) return null;

    // Daftar nomor halaman: [1, 2, 3, ...]
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            {/* Info jumlah data + pilihan data per halaman */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>
                    Menampilkan {startIndex}–{endIndex} dari {totalItems} data
                </span>
                {onItemsPerPageChange && (
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                        aria-label="Data per halaman"
                    >
                        <option value={5}>5 / halaman</option>
                        <option value={10}>10 / halaman</option>
                        <option value={25}>25 / halaman</option>
                    </select>
                )}
            </div>

            {/* Tombol navigasi halaman */}
            <div className="flex items-center gap-1.5">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-xs font-bold py-2 px-3 rounded bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    &laquo; Sebelumnya
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`text-xs font-bold py-2 px-3 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-xs font-bold py-2 px-3 rounded bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Berikutnya &raquo;
                </button>
            </div>
        </div>
    );
}
