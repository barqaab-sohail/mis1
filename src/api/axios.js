import axios from 'axios';
const token = localStorage.getItem('auth_token');
const api = axios.create({
    withCredentials: true,
    baseURL: 'https://barqaab.pk/hrms/public/api/',
    //'http://192.168.1.10/hrms/public/api/',
    //'http://192.168.0.121/hrms/public/api/',
    //'http://192.168.1.8/hrms/public/api/',
    headers: { Accept: 'application/json' }
});
api.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        Object.assign(config.headers.common, { Authorization: 'Bearer ' + localStorage.getItem('auth_token') });
        //console.log(config.headers.common.Authorization);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
export default api;
// const client = axios.create({
//     baseURL:
//         //'https://barqaab.pk/hrms/public/api/'
//         'http://192.168.1.10/hrms/public/api/'
//     //'http://192.168.0.121/hrms/public/api/',
//     //'http://192.168.1.8/hrms/public/api/',
// });
// export const request = ({ ...options }) => {
//     client.defaults.headers.common.Authorization = `Bearer ${token}`;
//     const onSuccess = (response) => response;
//     const onError = (error) => {
//         return error;
//     };
//     return client(options).then(onSuccess).catch(onError);
// };
