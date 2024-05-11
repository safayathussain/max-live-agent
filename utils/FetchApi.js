import axios from "axios"

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
            response = await axios.get(url);
        } else if (method === 'post') {
            response = await axios.post(url, data);
        } else if (method === 'put') {
            response = await axios.put(url, data);
        } else if (method === 'delete') {
            response = await axios.delete(url);
        } else {
            throw new Error('Invalid HTTP method');
        }
        const res = {data: response.data, callback}
        return res
    } catch (error) {
        console.error('Request failed:', error.message);
        throw error;
    }
}