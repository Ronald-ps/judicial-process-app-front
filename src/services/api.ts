import axios from "axios";

const baseUrl: string | undefined = import.meta.env.VITE_BACKEND_URL; /* .env */
if (!baseUrl) throw new Error("VITE_BACKEND_URL is not defined");

export const defaultClient = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  withCredentials: true,
});
axios.defaults.headers.common["Content-Type"] = "application/json";
