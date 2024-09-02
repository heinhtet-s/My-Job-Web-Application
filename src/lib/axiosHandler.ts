import axios from "axios";
const ApiReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
ApiReq.interceptors.request.use((config) => {
  config.timeout = 50000; // Wait for 5 seconds before timing out
  return config;
});

export default ApiReq;
