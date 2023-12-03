import axios from "axios"

const baseUrl = "http://localhost:3000/"

export const defaultClient = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  withCredentials: true,
});
axios.defaults.headers.common["Content-Type"] = "application/json";
