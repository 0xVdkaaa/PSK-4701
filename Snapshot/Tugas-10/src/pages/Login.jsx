import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Form from '../components/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import { showToast } from '../utils/toastHelper';
import { loginAPI } from '../utils/Apis/AuthApi'; // Balik pakai API terpisah lu

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value; 
        const password = e.target.password.value; 

        try {
            // Nembak API buat cek email & password via AuthApi.js
            const user = await loginAPI(email, password);
            
            // Simpan tiket "user" ke localStorage (syarat dari ProtectedRoute di main.jsx)
            localStorage.setItem("user", JSON.stringify(user));
            
            showToast.success("Login berhasil! Selamat datang.");
            
            // Arahin ke dashboard sesuai setingan main.jsx
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1500);

        } catch (error) {
            // Tangkap pesan error dari lemparan AuthApi.js
            showToast.error(error.message || "Network Error atau Kredensial Salah!"); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="p-8 w-96">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
                <Form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="rizqy@mail.com" required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="123" required />
                    </div>
                    <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                        Login
                    </Button>
                </Form>
                <p className="text-center mt-4 text-sm">
                    Belum punya akun? <a href="/register" className="text-blue-600 hover:underline">Daftar sekarang</a>
                </p>
            </Card>
        </div>
    );
}