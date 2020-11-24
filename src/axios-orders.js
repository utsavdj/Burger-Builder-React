import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-my-burger-ef2e2.firebaseio.com/"
});

export default instance;