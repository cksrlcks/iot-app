import axios from 'axios';
//axios 전역설정하는곳
const instance = axios.create({});
instance.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;
