import Button from './Button';

export default function DosenTable({ data = [], onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-green-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">NIDN</th>
                        <th className="py-3 px-4 text-left">Nama Dosen</th>
                        <th className="py-3 px-4 text-left">Mata Kuliah</th>
                        <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((dsn) => (
                        <tr key={dsn.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{dsn.nidn}</td>
                            <td className="py-3 px-4">{dsn.nama}</td>
                            <td className="py-3 px-4">{dsn.matkul}</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <Button type="button" onClick={() => onEdit(dsn)} className="bg-yellow-500 hover:bg-yellow-600 text-xs">Edit</Button>
                                <Button type="button" onClick={() => onDelete(dsn.id)} className="bg-red-500 hover:bg-red-600 text-xs">Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}