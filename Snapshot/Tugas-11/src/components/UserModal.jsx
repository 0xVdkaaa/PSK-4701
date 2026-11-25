import { useState, useEffect } from 'react';
import Button from './Button';
import Label from './Label';
import { PERMISSION_GROUPS, ROLES, getPermissionsForRole } from '../utils/permissions';

// Modal khusus Tugas 9: mengubah Role & Permission seorang user.
// - Memilih Role otomatis mengisi permission sesuai preset role itu.
// - Mengubah checkbox manual membuat role menjadi "Custom".
export default function UserModal({ isModalOpen, onClose, onSubmit, selectedUser }) {
    const [role, setRole] = useState('Viewer');
    const [permissions, setPermissions] = useState([]);

    // Isi form dari user yang dipilih saat modal dibuka
    useEffect(() => {
        if (selectedUser) {
            setRole(selectedUser.role ?? 'Custom');
            setPermissions(selectedUser.permissions ?? getPermissionsForRole(selectedUser.role));
        }
    }, [selectedUser, isModalOpen]);

    // Ganti role -> permission mengikuti preset role tersebut
    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);
        if (newRole !== 'Custom') {
            setPermissions(getPermissionsForRole(newRole));
        }
    };

    // Centang / hapus centang satu permission
    const handlePermissionChange = (permKey, checked) => {
        setPermissions((prev) => {
            const next = checked ? [...prev, permKey] : prev.filter((p) => p !== permKey);
            return next;
        });
        // Begitu checkbox diubah manual, role tidak lagi murni preset
        setRole('Custom');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ role, permissions });
    };

    if (!isModalOpen || !selectedUser) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-1">Ubah Role &amp; Permission</h3>
                <p className="text-sm text-gray-500 mb-4">
                    {selectedUser.name} &mdash; {selectedUser.email}
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="role">Role</Label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={handleRoleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {ROLES.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                            <option value="Custom">Custom (atur permission manual)</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">
                            Memilih Admin / Operator / Viewer akan mengisi permission sesuai preset. Mengubah centang di bawah akan mengubah role menjadi Custom.
                        </p>
                    </div>

                    <div className="mb-6">
                        <Label>Permission per Menu</Label>
                        {PERMISSION_GROUPS.map((group) => (
                            <div key={group.key} className="border border-gray-200 rounded-lg p-3 mb-3">
                                <p className="font-semibold text-sm mb-2">{group.menu}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {group.permissions.map((perm) => (
                                        <label key={perm.key} className="flex items-center space-x-2 text-sm cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={permissions.includes(perm.key)}
                                                onChange={(e) => handlePermissionChange(perm.key, e.target.checked)}
                                                className="w-4 h-4 accent-indigo-600"
                                            />
                                            <span>{perm.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <p className="text-xs text-gray-400">
                            Total terpilih: {permissions.length} hak akses.
                        </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Batal</Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Simpan Perubahan</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
