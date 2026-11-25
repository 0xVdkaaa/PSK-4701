// ============================================================
// TUGAS 9 - Definisi Role & Permission
// Role adalah "jabatan" user, Permission adalah hak akses
// detail per menu (lihat / tambah / ubah / hapus).
// ============================================================

// Semua permission yang dikenal aplikasi, dikelompokkan per menu
export const PERMISSION_GROUPS = [
    {
        menu: 'Mahasiswa',
        key: 'mahasiswa',
        permissions: [
            { key: 'mahasiswa.view', label: 'Lihat Data Mahasiswa' },
            { key: 'mahasiswa.create', label: 'Tambah Mahasiswa' },
            { key: 'mahasiswa.update', label: 'Ubah Mahasiswa' },
            { key: 'mahasiswa.delete', label: 'Hapus Mahasiswa' },
        ],
    },
    {
        menu: 'Dosen',
        key: 'dosen',
        permissions: [
            { key: 'dosen.view', label: 'Lihat Data Dosen' },
            { key: 'dosen.create', label: 'Tambah Dosen' },
            { key: 'dosen.update', label: 'Ubah Dosen' },
            { key: 'dosen.delete', label: 'Hapus Dosen' },
        ],
    },
    {
        menu: 'Mata Kuliah',
        key: 'matkul',
        permissions: [
            { key: 'matkul.view', label: 'Lihat Mata Kuliah' },
            { key: 'matkul.create', label: 'Tambah Mata Kuliah' },
            { key: 'matkul.update', label: 'Ubah Mata Kuliah' },
            { key: 'matkul.delete', label: 'Hapus Mata Kuliah' },
        ],
    },
    {
        menu: 'Kelas',
        key: 'kelas',
        permissions: [
            { key: 'kelas.view', label: 'Lihat Data Kelas' },
            { key: 'kelas.create', label: 'Tambah Kelas' },
            { key: 'kelas.update', label: 'Ubah Kelas' },
            { key: 'kelas.delete', label: 'Hapus Kelas' },
        ],
    },
    {
        menu: 'Manajemen User',
        key: 'user',
        permissions: [
            { key: 'user.view', label: 'Lihat Data User' },
            { key: 'user.update', label: 'Ubah Role & Permission User' },
            { key: 'user.delete', label: 'Hapus User' },
        ],
    },
];

// Daftar rata semua permission: ['mahasiswa.view', 'mahasiswa.create', ...]
export const ALL_PERMISSIONS = PERMISSION_GROUPS.flatMap((group) =>
    group.permissions.map((perm) => perm.key)
);

// Preset permission untuk tiap role.
// Kalau role dipilih di form, checkbox permission otomatis
// mengikuti preset ini (tapi tetap bisa diubah manual -> Custom).
export const ROLE_PRESETS = {
    Admin: [...ALL_PERMISSIONS],
    Operator: [
        'mahasiswa.view', 'mahasiswa.create', 'mahasiswa.update',
        'dosen.view', 'dosen.create', 'dosen.update',
        'matkul.view', 'matkul.create', 'matkul.update',
        'kelas.view', 'kelas.create', 'kelas.update',
        'user.view',
    ],
    Viewer: [
        'mahasiswa.view',
        'dosen.view',
        'matkul.view',
        'kelas.view',
    ],
};

export const ROLES = Object.keys(ROLE_PRESETS);

// Ambil preset permission berdasarkan nama role
export const getPermissionsForRole = (role) => ROLE_PRESETS[role] ?? [];

// Cek apakah user yang login punya satu permission tertentu.
// User lama (data Tugas 8) yang belum punya field role/permission
// dianggap Admin supaya tidak terkunci dari aplikasi sendiri.
export const hasPermission = (user, permission) => {
    if (!user) return false;
    if (!user.role && !user.permissions) return true;
    if (user.role === 'Admin') return true;
    return Array.isArray(user.permissions) && user.permissions.includes(permission);
};

// Baca user yang sedang login dari localStorage
export const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
};
