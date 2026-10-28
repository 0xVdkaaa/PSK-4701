import AxiosInstance from "../AxiosInstance";

export const loginAPI = async (email, password) => {
    // Cari user berdasarkan email
    const res = await AxiosInstance.get("/user", { params: { email } });
    const user = res.data[0]; // Ambil data pertama

    if (!user) throw new Error("Email tidak ditemukan bos!");
    if (user.password !== password) throw new Error("Password salah!");

    return user;
};
export const registerAPI = async (data) => {
    // Nembak POST ke /user buat nambahin data baru
    const res = await AxiosInstance.post("/user", data);
    return res.data;
};