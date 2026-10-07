import Card from '../components/Card';
import Form from '../components/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
    
    // Data JSON Dummy sesuai materi dosen
    const dummyUser = {
        email: "admin@mail.com",
        password: "123"
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value; // Ambil nilai dari input id="email"
        const password = e.target.password.value; // Ambil nilai dari input id="password"

        // Cek apakah inputan cocok sama data dummy
        if (email === dummyUser.email && password === dummyUser.password) {
            // Kalau sukses, simpan 'user' ke localStorage
            localStorage.setItem("user", JSON.stringify(dummyUser));
            window.location.href = "/admin"; // Redirect cara dosen
        } else {
            alert('Email atau password salah bos!');
        }
    };

    return (
        <Card className="p-8 w-96">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
            <Form onSubmit={handleLogin}>
                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="admin@mail.com" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="123" 
                        required 
                    />
                </div>
                <Button type="submit" className="w-full mt-4">Login</Button>
            </Form>
        </Card>
    );
}