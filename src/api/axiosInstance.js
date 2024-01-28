import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3001/api/v1",
// });
const axiosInstance = axios.create({
  baseURL: "https://social-app-api-be78.onrender.com/api/v1",
});

export default axiosInstance;
