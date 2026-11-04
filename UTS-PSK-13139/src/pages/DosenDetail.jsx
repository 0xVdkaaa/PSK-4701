import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function DosenDetail() {
  // Ambil parameter :nidn dari URL
  const { nidn } = useParams();
  const navigate = useNavigate();
  
  const [dosen, setDosen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading biar smooth
    const timer = setTimeout(() => {
      const savedData = JSON.parse(localStorage.getItem("dosenData")) || [];
      // Cari dosen yang NIDN-nya cocok sama URL
      const foundDosen = savedData.find((d) => d.nidn === nidn);
      
      setDosen(foundDosen);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [nidn]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500 animate-pulse font-medium">Memuat detail dosen...</div>;
  }

  // Handle kalau NIDN nggak ada di localStorage
  if (!dosen) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data dosen tidak ditemukan.</h2>
        <Button onClick={() => navigate("/admin/dosen")} className="!bg-gray-500 hover:!bg-gray-600">
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Card className="max-w-2xl mt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Detail Dosen</h2>
        
        <div className="space-y-6 mb-10">
          <div className="flex">
            <span className="w-32 text-gray-600 text-sm font-medium">NIDN</span>
            <span className="text-gray-900 text-sm">{dosen.nidn}</span>
          </div>
          <div className="flex">
            <span className="w-32 text-gray-600 text-sm font-medium">Nama</span>
            <span className="text-gray-900 text-sm">{dosen.nama}</span>
          </div>
          <div className="flex">
            <span className="w-32 text-gray-600 text-sm font-medium">Mata Kuliah</span>
            <span className="text-gray-900 text-sm">{dosen.mataKuliah}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 text-gray-600 text-sm font-medium">Status</span>
            <div>
              <span className={`px-2 py-1 text-xs font-bold rounded-md ${dosen.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                {dosen.status}
              </span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => navigate("/admin/dosen")} 
          className="!bg-gray-500 hover:!bg-gray-600 text-sm flex items-center gap-2"
        >
          <span>&#x2190;</span> Kembali
        </Button>
      </Card>
    </div>
  );
}