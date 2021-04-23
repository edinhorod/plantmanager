import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.17.240.1:3333',
    // baseURL: 'http://localhost:3333',
    // baseURL: 'http://10.0.0.108:3333',
    // baseURL: 'http://10.0.0.104:3333',
});

export default api;