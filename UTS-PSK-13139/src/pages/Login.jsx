import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // <-- Tambahan state buat notif sukses
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Reset notif tiap kali tombol diklik
    setError(""); 
    setSuccess("");

    if (email === "13139@mail.com" && password === "13139") {
      setSuccess("Login berhasil! Mengalihkan ke dashboard...");
      localStorage.setItem("user", JSON.stringify({ email }));
      
      // Kasih jeda 1.5 detik (1500 ms) biar notif ijonya kebaca sebelum pindah
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <Card className="w-full max-w-md border-t-4 border-fuchsia-500">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-fuchsia-600">ADMIN-13139</h1>
        <p className="text-gray-500 text-sm mt-1">Silakan login untuk melanjutkan</p>
      </div>

      {/* Kotak Notif Error */}
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-center text-sm font-medium">
          {error}
        </div>
      )}

      {/* Kotak Notif Sukses (Baru) */}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded-md mb-4 text-center text-sm font-medium animate-pulse">
          {success}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="13139@mail.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
          />
        </div>
        <Button type="submit" wFull>
          Login
        </Button>
      </form>
    </Card>
  );
}