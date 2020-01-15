import axios from 'axios';

export const createTeam = ({ name, managerID }) =>
    axios
        .post('/team/create', { name, managerID })
        .then(response => response.data.team)
        .catch(error => error);

export const removeTeam = ({ teamID }) =>
    axios
        .delete(`/team/${teamID}`)
        .then(response => response.data.team)
        .catch(error => error);

export const getAllTeams = () =>
    axios
        .get('/team')
        .then(response => response.data.teams)
        .catch(error => error);

export const setManager = ({ teamID, managerID }) =>
    axios
        .patch(`/team/setManager/${teamID}`, { managerID })
        .then(response => response)
        .catch(error => error);

export const getUsers = () =>
    axios
        .get('/user')
        .then(response => response.data.users)
        .catch(error => error);

export const getByID = ({ userID }) =>
    axios
        .get(`/user/${userID}`)
        .then(response => response.data.user)
        .catch(error => error);

export const removeUser = ({ userID }) => {
    axios.delete(`/user/remove/${userID}`).catch(error => error);
};
