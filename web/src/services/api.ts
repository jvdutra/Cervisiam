import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:50440/api'
});

export default api;