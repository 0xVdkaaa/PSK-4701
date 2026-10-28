import Card from '../components/Card';
import Form from '../components/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import { showToast } from '../utils/toastHelper';
import { loginAPI } from '../utils/Apis/AuthApi'; // Import API Login
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value; 
        const password = e.target.password.value; 

        try {
            // Nembak API buat cek email & password
            const user = await loginAPI(email, password);
            
            // Kalau berhasil, simpan ke localStorage
            localStorage.setItem("user", JSON.stringify(user));
            showToast.success("Login berhasil! Selamat datang.");
            
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1500);

        } catch (error) {
            // Tangkap pesan error dari lemparan AuthApi.js
            showToast.error(error.message); 
        }
    };

    return (
        <Card className="p-8 w-96">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
            <Form onSubmit={handleLogin}>
                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="admin@mail.com" required />
                </div>
                <div className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="123" required />
                </div>
                <Button type="submit" className="w-full mt-4">Login</Button>
            </Form>
            <p className="text-center mt-4 text-sm">
                Belum punya akun? <a href="/register" className="text-blue-600 hover:underline">Daftar sekarang</a>
            </p>
        </Card>
    );
}