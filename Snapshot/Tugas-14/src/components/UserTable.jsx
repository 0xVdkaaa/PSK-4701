import Button from './Button';

// Warna badge dibedakan per role biar gampang dibaca sekilas
const roleBadge = (role) => {
    switch (role) {
        case 'Admin':
            return 'bg-red-100 text-red-700';
        case 'Operator':
            return 'bg-blue-100 text-blue-700';
        case 'Viewer':
            return 'bg-gray-200 text-gray-700';
        default:
            return 'bg-purple-100 text-purple-700'; // Custom / role lain
    }
};

export default function UserTable({ data = [], onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-indigo-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Nama</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Role</th>
                        <th className="py-3 px-4 text-left">Permission</th>
                        <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded text-sm font-semibold ${roleBadge(user.role)}`}>
                                    {user.role ?? 'Belum diatur'}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <span className="text-sm text-gray-600">
                                    {Array.isArray(user.permissions) ? user.permissions.length : 0} hak akses
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1 max-w-md">
                                    {(user.permissions ?? []).slice(0, 4).map((perm) => (
                                        <span key={perm} className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 text-xs">
                                            {perm}
                                        </span>
                                    ))}
                                    {(user.permissions ?? []).length > 4 && (
                                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 text-xs">
                                            +{user.permissions.length - 4} lainnya
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                    <Button type="button" onClick={() => onEdit(user)} className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                                        Ubah Role &amp; Permission
                                    </Button>
                                    <Button type="button" onClick={() => onDelete(user.id)} className="bg-red-500 hover:bg-red-600 text-xs">
                                        Hapus
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan="5" className="py-6 px-4 text-center text-gray-500">
                                Belum ada data user.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
