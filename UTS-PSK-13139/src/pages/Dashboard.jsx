import { useState, useEffect } from "react";
import { Card } from "@/components/Card";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, aktif: 0, cuti: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Syarat wajib: Delay 500ms pakai setTimeout
    const timer = setTimeout(() => {
      let dosenData = JSON.parse(localStorage.getItem("dosenData"));

      // Kalau localStorage kosong, kita suntik 4 data awal sesuai aturan UTS
      if (!dosenData || dosenData.length === 0) {
        dosenData = [
          {
            nidn: "1202013139", // NIDN lu (10 digit angka)
            nama: "Rizqy Akbar Dinul Putra", // Nama lu sebagai dosen pertama
            mataKuliah: "Pemrograman Sisi Klien",
            status: "Aktif"
          },
          {
            nidn: "0623048802",
            nama: "Rina Kartika, M.T.",
            mataKuliah: "Basis Data",
            status: "Cuti"
          },
          {
            nidn: "0612078501",
            nama: "Dr. Andi Wijaya, M.Kom",
            mataKuliah: "Pemrograman Web",
            status: "Aktif"
          },
          {
            nidn: "0605119003",
            nama: "Bayu Pratama, M.Cs.",
            mataKuliah: "Struktur Data",
            status: "Aktif"
          }
        ];
        localStorage.setItem("dosenData", JSON.stringify(dosenData));
      }

      // Hitung otomatis buat angka di kartu dashboard
      setStats({
        total: dosenData.length,
        aktif: dosenData.filter((d) => d.status === "Aktif").length,
        cuti: dosenData.filter((d) => d.status === "Cuti").length
      });
      
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500 font-medium animate-pulse">Memuat data dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang di Dashboard</h1>
      <p className="text-gray-500 mb-8 text-sm">Ringkasan data dosen</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ganti fuchsia dengan warna tema asli lu */}
        <Card className="border-t-4 border-fuchsia-500">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Dosen</div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
        </Card>

        <Card className="border-t-4 border-green-500">
          <div className="text-gray-500 text-sm font-medium mb-1">Dosen Aktif</div>
          <div className="text-3xl font-bold text-gray-900">{stats.aktif}</div>
        </Card>

        <Card className="border-t-4 border-gray-400">
          <div className="text-gray-500 text-sm font-medium mb-1">Dosen Cuti</div>
          <div className="text-3xl font-bold text-gray-900">{stats.cuti}</div>
        </Card>
      </div>
    </div>
  );
}