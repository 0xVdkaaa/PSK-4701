import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function MahasiswaDetail() {
    const { nim } = useParams(); // Nangkep parameter :nim dari URL
    const navigate = useNavigate();

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Detail Mahasiswa</h2>
            <div className="bg-gray-50 p-4 rounded border mb-6">
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold w-24 inline-block">NIM</span>: {nim}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold w-24 inline-block">Status</span>: Aktif
                </p>
            </div>
            <Button onClick={() => navigate('/admin/mahasiswa')}>
                Kembali
            </Button>
        </Card>
    );
}