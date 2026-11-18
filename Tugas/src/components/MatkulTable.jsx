import Button from './Button';

export default function MatkulTable({ data = [], onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-purple-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Kode Matkul</th>
                        <th className="py-3 px-4 text-left">Nama Mata Kuliah</th>
                        <th className="py-3 px-4 text-left">SKS</th>
                        <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((mk) => (
                        <tr key={mk.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{mk.kode}</td>
                            <td className="py-3 px-4">{mk.nama}</td>
                            <td className="py-3 px-4">{mk.sks}</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <Button type="button" onClick={() => onEdit(mk)} className="bg-yellow-500 hover:bg-yellow-600 text-xs">Edit</Button>
                                <Button type="button" onClick={() => onDelete(mk.id)} className="bg-red-500 hover:bg-red-600 text-xs">Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}