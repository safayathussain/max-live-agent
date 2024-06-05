import { store } from "@/redux/store";
import axios from "axios"
import toast from "react-hot-toast";




export const FetchApi = async ({
    method = 'get',
    url = '',
    data = {},
    callback = () => { },
    token = ''
}) => {
    let instance;
    if (url !== 'agency/agencySignin') {
        instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BASE_API, // Set a base URL for all requests
            headers: {
                'Authorization': `Bearer ${store.getState().auth?.user?.sanitizedUser?.accessToken || ''}`, // Authorization header
                'Content-Type': 'application/json',
            }
        });
        
    } else {
        instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BASE_API, // Set a base URL for all requests
            headers: {
                'Content-Type': 'application/json',
            }
        });


    }

    try {
        let response;
        if (method === 'get') {
            response = await instance.get(url, data);
        } else if (method === 'post') {
            response = await instance.post(url, data);
        } else if (method === 'put') {
            response = await instance.put(url, data);
        } else if (method === 'delete') {
            response = await instance.delete(url);
        } else {
            throw new Error('Invalid HTTP method');
        }
        callback()
        const res = { data: response?.data, status: response?.status, }
        return res
    } catch (error) {
        console.error('Request failed:', error);
        toast.error(`${(error?.response?.data?.message || error?.response?.data?.error) || 'Something went wrong'}`)

        return error.response?.data
        // throw error;
    }
}