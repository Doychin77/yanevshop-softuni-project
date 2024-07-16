import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://yanevshop.test/api', // Make sure this URL is correct
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;