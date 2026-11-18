let dataMahasiswa = [];

const ObjekMahasiswa = {
    show: () => {
        console.table(dataMahasiswa);
    },

    add: (nim, nama, tugas, uts, uas, statusAktif) => {
        dataMahasiswa.push({ nim, nama, tugas, uts, uas, statusAktif });
    },

    update: (nim, dataBaru) => {
        const index = dataMahasiswa.findIndex(m => m.nim === nim);
        if (index !== -1) {
            dataMahasiswa[index] = { ...dataMahasiswa[index], ...dataBaru };
        }
    },

    deleteById: (nim) => {
        dataMahasiswa = dataMahasiswa.filter(m => m.nim !== nim);
    },

    totalNilai: (nim) => {
        const m = dataMahasiswa.find(m => m.nim === nim);
        if (m) {
            return ((m.tugas + m.uts + m.uas) / 3).toFixed(2);
        }
        return 0;
    },

    kategoriNilai: function(nim) {
        const total = this.totalNilai(nim);
        if (total >= 85) return 'A';
        if (total >= 70) return 'B';
        if (total >= 60) return 'C';
        if (total >= 50) return 'D';
        return 'E';
    },

    IPS: function(nim) {
        const kategori = this.kategoriNilai(nim);
        switch(kategori) {
            case 'A': return 4.0;
            case 'B': return 3.0;
            case 'C': return 2.0;
            case 'D': return 1.0;
            default: return 0.0;
        }
    },

    clear: () => {
        dataMahasiswa = [];
    }
};

const ListMahasiswa = {
    jumlahMahasiswa: () => {
        return dataMahasiswa.length;
    },

    sortByNIM: () => {
        return [...dataMahasiswa].sort((a, b) => a.nim.localeCompare(b.nim));
    },

    sortByStatus: () => {
        return [...dataMahasiswa].sort((a, b) => Number(b.statusAktif) - Number(a.statusAktif));
    },

    jumlahAktifTidak: () => {
        const aktif = dataMahasiswa.filter(m => m.statusAktif === true).length;
        const tidakAktif = dataMahasiswa.length - aktif;
        return { Aktif: aktif, TidakAktif: tidakAktif };
    },

    clearArray: () => {
        dataMahasiswa.length = 0;
    }
};

ObjekMahasiswa.add("A11.2020.13139", "Rizqy Akbar Dinul Putra", 90, 85, 88, true);
ObjekMahasiswa.add("A11.2020.12001", "Natha", 95, 90, 92, true);
ObjekMahasiswa.add("A11.2020.11055", "Dimas", 60, 50, 55, false);

ObjekMahasiswa.show();

let nimTest = "A11.2020.13139";
console.log(ObjekMahasiswa.totalNilai(nimTest));
console.log(ObjekMahasiswa.kategoriNilai(nimTest));
console.log(ObjekMahasiswa.IPS(nimTest));

console.log(ListMahasiswa.jumlahMahasiswa());
console.log(ListMahasiswa.jumlahAktifTidak());

console.log(ListMahasiswa.sortByNIM());
console.log(ListMahasiswa.sortByStatus());

ObjekMahasiswa.update("A11.2020.11055", { nama: "Dimas (Cuti)", statusAktif: false });
ObjekMahasiswa.deleteById("A11.2020.12001");
ObjekMahasiswa.show();