import AxiosInstance from "../AxiosInstance";

export const getAllMatkul = () => AxiosInstance.get("/matkul");
export const storeMatkul = (data) => AxiosInstance.post("/matkul", data);
export const updateMatkul = (id, data) => AxiosInstance.put(`/matkul/${id}`, data);
export const deleteMatkul = (id) => AxiosInstance.delete(`/matkul/${id}`);