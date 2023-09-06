import axios from 'axios'

const backend = axios.create({
  baseURL:'http://localhost:5000',
})

backend.interceptors.request.use(
  (config) => {
    let token = ''
    token = sessionStorage.getItem('token')
    if (!token) token = localStorage.getItem('token')
    if (token) config.headers = { Authorization: `Bearer ${token}` }
    return config
  },
  (error) => Promise.reject(error)
)

export default backend
