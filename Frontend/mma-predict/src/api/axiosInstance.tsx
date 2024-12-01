import axios from "axios";


// TODO add path defined in the backend
const axiosInstance = axios.create({
  baseURL: "https://your-api-url.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
