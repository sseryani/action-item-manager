import axios from 'axios';

import { getCurrentUser } from 'utils/currentUser';

export const getTeams = () => {
    const currentUser = getCurrentUser();

    return axios
        .post('/team/teamsFromList', { teamList: currentUser.teamIDList })
        .then(response => response.data.teams)
        .catch(error => error);
};

export const getTeamActionItems = ({ teamID }) =>
    axios
        .get(`/action-item/team/${teamID}`)
        .then(response => response.data.actionItems)
        .catch(error => error);

export const createActionItem = ({ teamID, title, description, dueDate }) =>
    axios
        .post(`/action-item/create/`, { teamID, title, description, dueDate })
        .then(response => response.data.actionItem)
        .catch(error => error);

export const getTeamUsers = ({ teamID }) =>
    axios
        .get(`/team/users/${teamID}`)
        .then(response => response.data)
        .catch(error => error);

export const addUserToTeam = ({ userID, teamID }) =>
    axios
        .post(`/user/addToTeam`, { userID, teamID })
        .then(response => response)
        .catch(error => error);

export const removeUserFromTeam = ({ userID, teamID }) =>
    axios
        .post(`/user/removeFromTeam`, { userID, teamID })
        .then(response => response)
        .catch(error => error);
