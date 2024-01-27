import axios from "axios";

const BASE_URL_AUTH = "https://localhost:3000/v1/";
const BASE_URL = "http://localhost:3000/v1/";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: BASE_URL_AUTH,
  headers: { "Content-Type": "application/json" },
});