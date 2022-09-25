import axios from 'axios';

const token = localStorage.getItem('auth_token');
export default axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.0.121/hrms/public/api/',
    //'http://192.168.1.10/hrms/public/api/',

    headers: { Accept: 'application/json' }
});
