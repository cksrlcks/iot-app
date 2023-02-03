import axios from './axios';
export const fetcher = (...args) =>
    axios(...args).then((res) => {
        return res.data;
    });
