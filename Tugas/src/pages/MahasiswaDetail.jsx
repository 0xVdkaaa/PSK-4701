import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { getMahasiswa } from '../utils/Apis/MahasiswaApi';
import { showToast } from '../utils/toastHelper';

export default function MahasiswaDetail() {
    const { id } = useParams(); // Nangkep parameter ID dari URL
    const [mahasiswa, setMahasiswa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getMahasiswa(id);
                setMahasiswa(res.data);
            } catch (error) {
                showToast.error("Gagal mengambil data detail mahasiswa.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Memuat data...</p>;
    if (!mahasiswa) return <p className="text-center mt-10 text-red-500">Data tidak ditemukan</p>;

    return (
        <Card className="p-8 w-full max-w-2xl mx-auto mt-10 shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b pb-2">Detail Mahasiswa</h2>
            <div className="space-y-4 mb-8">
                <div>
                    <p className="text-gray-500 text-sm font-semibold">NIM</p>
                    <p className="text-lg font-medium">{mahasiswa.nim}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-semibold">Nama Lengkap</p>
                    <p className="text-lg font-medium">{mahasiswa.nama}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-semibold">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${mahasiswa.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {mahasiswa.status ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                </div>
            </div>
            <Link to="/admin/mahasiswa">
                <Button className="bg-gray-600 hover:bg-gray-700">Kembali</Button>
            </Link>
        </Card>
    );
}