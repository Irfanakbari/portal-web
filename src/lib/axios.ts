import axios from "axios";

const BASE_URL_AUTH = "https://api.vuteq.co.id/v1/";
const BASE_URL = "https://api.vuteq.co.id/v1/";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: BASE_URL_AUTH,
  headers: { "Content-Type": "application/json" },
});