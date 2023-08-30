import axios, { AxiosInstance } from "axios";
var baseURL;

switch (import.meta.env.MODE) {
    case 'development':
        axios.defaults.baseURL = 'http://localhost:3000/';
        break;
    case 'production':
        axios.defaults.baseURL = 'https://fbpsql.ewnix.net/';
        break;
}

const apiClient: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
    },

});
export default apiClient;