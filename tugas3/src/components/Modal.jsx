import Label from './Label';
import Input from './Input';
import Button from './Button';
import Form from './Form';

export default function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Tambah Mahasiswa</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl font-bold">&times;</button>
                </div>
                <Form>
                    <div className="mb-4">
                        <Label htmlFor="nim">NIM</Label>
                        <Input id="nim" type="text" placeholder="Masukkan NIM" />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="nama">Nama</Label>
                        <Input id="nama" type="text" placeholder="Masukkan Nama" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Batal</Button>
                        <Button>Simpan</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}