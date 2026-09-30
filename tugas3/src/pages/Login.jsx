import AuthLayout from '../layouts/AuthLayout';
import Card from '../components/Card';
import Form from '../components/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
    return (
        <AuthLayout>
            <Card className="p-8 w-96">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
                <Form>
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Masukkan email" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Masukkan password" />
                    </div>
                    <Button className="w-full mt-4">Login</Button>
                </Form>
            </Card>
        </AuthLayout>
    );
}