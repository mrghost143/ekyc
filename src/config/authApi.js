
import axios from 'axios';

// Create an instance of axios
const authApi = axios.create({
    baseURL: 'https://localhost:3000', // Replace with your API URL
});

// Add a request interceptor
authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Replace with your token source
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

// Add a response interceptor
authApi.interceptors.response.use(
    (response) => {
        // Handle the response data
        return response;
    },
    (error) => {
        // Handle the error response
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default authApi;
