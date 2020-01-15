import axios from 'axios';

export const login = ({ email, password }) =>
    axios
        .post('/user/login', { email, password })
        .then(response => window.location = '/action-items')
        .catch(error => console.log(error));


export const createUser = ({ email, firstName, lastName, password }) =>
    axios
        .post('/user/create', { email, firstName, lastName, password })
        .then(response => window.location = '/action-items')
        .catch(error => console.log(error));
