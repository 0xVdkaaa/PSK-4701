// ============================================================
// TUGAS 13 - Aturan Pengelolaan Kelas.
// 1. Satu Mata Kuliah hanya boleh memiliki satu Dosen
//    (mata kuliah yang sama di kelas lain harus diajar dosen
//    yang sama).
// 2. Dosen memiliki beban mengajar maksimal (MAKS_SKS_DOSEN).
// 3. Mahasiswa memiliki batas pengambilan maksimal
//    (MAKS_SKS_MAHASISWA), dan total SKS yang sudah diambil
//    setiap mahasiswa dapat dihitung dari kelas-kelasnya.
// ============================================================

export const MAKS_SKS_DOSEN = 12;
export const MAKS_SKS_MAHASISWA = 24;

const sksMatkul = (matkulList, matkulId) =>
    Number(matkulList.find((m) => String(m.id) === String(matkulId))?.sks ?? 0);

// Total SKS beban mengajar seorang dosen dari semua kelasnya.
// excludeKelasId dipakai saat edit agar kelas yang sedang diedit
// tidak terhitung dua kali.
export const hitungSksDosen = (dosenId, kelasList, matkulList, excludeKelasId = null) =>
    kelasList
        .filter((k) => String(k.dosenId) === String(dosenId) && String(k.id) !== String(excludeKelasId))
        .reduce((total, k) => total + sksMatkul(matkulList, k.matkulId), 0);

// Total SKS yang sudah diambil seorang mahasiswa dari semua
// kelas yang diikutinya.
export const hitungSksMahasiswa = (mahasiswaId, kelasList, matkulList, excludeKelasId = null) =>
    kelasList
        .filter((k) => String(k.id) !== String(excludeKelasId))
        .filter((k) => (k.mahasiswaIds ?? []).map(String).includes(String(mahasiswaId)))
        .reduce((total, k) => total + sksMatkul(matkulList, k.matkulId), 0);

// Validasi form kelas sebelum disimpan.
// Mengembalikan pesan error (string) bila ada aturan yang
// dilanggar, atau null bila data valid.
export const validasiKelas = (form, kelasList, matkulList, dosenList, mahasiswaList, editingId = null) => {
    const matkul = matkulList.find((m) => String(m.id) === String(form.matkulId));
    const sks = Number(matkul?.sks ?? 0);

    // Aturan 1: satu mata kuliah hanya boleh memiliki satu dosen
    const kelasMatkulSama = kelasList.find(
        (k) => String(k.matkulId) === String(form.matkulId)
            && String(k.id) !== String(editingId)
            && String(k.dosenId) !== String(form.dosenId)
    );
    if (kelasMatkulSama) {
        const dosenPengampu = dosenList.find((d) => String(d.id) === String(kelasMatkulSama.dosenId))?.nama ?? '-';
        return `Mata kuliah ${matkul?.nama ?? ''} sudah diajar oleh ${dosenPengampu} pada kelas "${kelasMatkulSama.nama}". Satu mata kuliah hanya boleh memiliki satu dosen.`;
    }

    // Aturan 2: beban SKS dosen tidak boleh melebihi maksimal
    const bebanDosen = hitungSksDosen(form.dosenId, kelasList, matkulList, editingId);
    if (bebanDosen + sks > MAKS_SKS_DOSEN) {
        const namaDosen = dosenList.find((d) => String(d.id) === String(form.dosenId))?.nama ?? '-';
        return `Beban mengajar ${namaDosen} akan menjadi ${bebanDosen + sks} SKS (saat ini ${bebanDosen} SKS + ${sks} SKS), melebihi maksimal ${MAKS_SKS_DOSEN} SKS untuk dosen.`;
    }

    // Aturan 3: total SKS setiap mahasiswa tidak boleh melebihi maksimal
    for (const mhsId of form.mahasiswaIds ?? []) {
        const totalMhs = hitungSksMahasiswa(mhsId, kelasList, matkulList, editingId);
        if (totalMhs + sks > MAKS_SKS_MAHASISWA) {
            const namaMhs = mahasiswaList.find((m) => String(m.id) === String(mhsId))?.nama ?? '-';
            return `Total SKS ${namaMhs} akan menjadi ${totalMhs + sks} SKS (saat ini ${totalMhs} SKS + ${sks} SKS), melebihi maksimal ${MAKS_SKS_MAHASISWA} SKS untuk mahasiswa.`;
        }
    }

    return null;
};
