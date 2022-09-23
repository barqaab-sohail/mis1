import axios from 'axios';

const token = localStorage.getItem('auth_token');
export default axios.create({
    withCredentials: true,
    baseURL: 'https://barqaab.pk/hrms/public/api/',
    headers: { Accept: 'application/json' }
});
