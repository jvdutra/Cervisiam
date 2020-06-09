import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:50440'
});

export default api;