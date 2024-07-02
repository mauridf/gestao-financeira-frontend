import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5182'
});

export default api;