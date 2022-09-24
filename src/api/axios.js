import axios from 'axios';

const token = localStorage.getItem('auth_token');
export default axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.0.121/hrms/public/api/',
    headers: { Accept: 'application/json' }
});
