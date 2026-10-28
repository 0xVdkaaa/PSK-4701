import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Form from '../components/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import { showToast } from '../utils/toastHelper';
import { registerAPI } from '../utils/Apis/AuthApi';

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await registerAPI({ name, email, password });
            showToast.success("Registrasi berhasil! Silakan Login.");
            setTimeout(() => {
                navigate("/"); // Balik ke halaman login
            }, 1500);
        } catch (error) {
            showToast.error("Gagal melakukan registrasi.");
        }
    };

    return (
        <Card className="p-8 w-96 mx-auto mt-20 shadow-xl">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Register</h2>
            <Form onSubmit={handleRegister}>
                <div className="mb-4">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" name="name" type="text" placeholder="Masukkan nama" required />
                </div>
                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="contoh@mail.com" required />
                </div>
                <div className="mb-6">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="Buat password" required />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Daftar Sekarang</Button>
            </Form>
            <p className="text-center mt-4 text-sm">
                Sudah punya akun? <Link to="/" className="text-blue-600 hover:underline">Login di sini</Link>
            </p>
        </Card>
    );
}