import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;