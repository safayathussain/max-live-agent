import axios from "axios"
import toast from "react-hot-toast";


const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API, // Set a base URL for all requests
    // timeout: 5000, // Set a timeout for requests (in milliseconds)
    headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Authorization header
        'Content-Type': 'application/json', 
    }
});


export const FetchApi = async ({
    method = 'get',
    url = '',
    token = '',
    data = {},
    callback = () => { }
}) => {
    try {
        let response;
        if (method === 'get') {
            response = await instance.get(url);
        } else if (method === 'post') {
            response = await instance.post(url, data);
        } else if (method === 'put') {
            response = await instance.put(url, data);
        } else if (method === 'delete') {
            response = await instance.delete(url);
        } else {
            throw new Error('Invalid HTTP method');
        }
        const res = { data: response.data, status: response.status, callback }
        return res
    } catch (error) {
        console.error('Request failed:', error.message);
        toast.error(`Request failed: ${error.message}`)
        throw error;
    }
}