import axios from "axios";

const api = axios.create({
    baseURL: "https://separalixoback.onrender.com",
  });
  
export default api;