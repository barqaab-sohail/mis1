import axios from 'axios';

export default axios.create({
    withCredentials: true,
    baseURL: 'https://barqaab.pk/hrms/public/api/',
    //'http://192.168.1.10/hrms/public/api/',
    //'http://192.168.0.121/hrms/public/api/',
    //'http://192.168.1.8/hrms/public/api/',

    headers: { Accept: 'application/json' }
});

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
