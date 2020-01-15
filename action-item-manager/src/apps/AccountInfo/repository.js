import * as user from 'model/user';
import axios from 'axios';


export const submitPassword = ({ userID, password }) => 
    
    axios
        .patch(`/user/changePassword/${userID}`, { password })
        .then(response => response)
        .catch(error => error);

export const submitInfo = ({ userID, firstName, lastName, email }) => 
    axios
        .patch(`/user/${userID}`, { firstName, lastName, email })
        .then(response => response)
        .catch(error => error);
