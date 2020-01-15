import axios from 'axios';

export const logout = () =>
    axios
        .get('/user/logout')
        .then(response => window.location = '/login')
        .catch(error => console.log(error));
