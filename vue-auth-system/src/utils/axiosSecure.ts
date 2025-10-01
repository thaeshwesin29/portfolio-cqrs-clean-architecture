// utils/axiosSecure.ts
import axios from 'axios'

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // send cookies
})

export default axiosSecure
