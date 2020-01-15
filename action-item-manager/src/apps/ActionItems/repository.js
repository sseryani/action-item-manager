import * as actionItem from 'model/actionItem';
import axios from 'axios';

import { getCurrentUser } from 'utils/currentUser';

export const getActionItemsForCurrentUser = () => {
    const currentUser = getCurrentUser();

    return axios
        .post('/action-item/current', { teamList: currentUser.teamIDList })
        .then(response => response.data.actionItems)
        .catch(error => error);
};

export const getTeamByID = ({ teamID }) =>
    axios
        .get(`/team/${teamID}`)
        .then(response => response.data.team)
        .catch(error => error);

export const getSize = ({ teamID }) =>
    axios
        .get(`/team/size/${teamID}`)
        .then(response => response.data.length)
        .catch(error => error);

export const update = ({ actionItemID, title, description, dueDate }) =>
    axios
        .patch(`/action-item/${actionItemID}`, { title, description, dueDate })
        .then(response => response)
        .catch(error => error);

export const deleteActionItem = ({ actionItemID }) =>
    axios
        .delete(`/action-item/${actionItemID}`)
        .then(response => response)
        .catch(error => error);

export const getUsersCompleted = ({ actionItemID }) =>
    axios
        .get(`/action-item/usersCompleted/${actionItemID}`)
        .then(response => response.data.users)
        .catch(error => error);

export const toggleActionItemComplete = ({ userID, actionItemID, isComplete }) => {
    axios
        .post(`/action-item/complete/${actionItemID}`, { userID, isComplete })
        .then(response => response)
        .catch(error => error);
}

export const didComplete = ({ actionItemID, userID }) =>
    axios
        .get(`/action-item/usersCompleted/${actionItemID}/${userID}`)
        .then(response => response.data)
        .catch(error => error);
