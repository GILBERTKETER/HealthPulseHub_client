// utils/api.js
import axios from "axios";

const DbInstance = axios.create({
  baseURL: "http://localhost/healthpulsehub_backend/",
  timeout: 30000,
});

export default DbInstance;
