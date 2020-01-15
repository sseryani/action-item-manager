import { getCurrentUser } from 'utils/currentUser';
import { getList, isOnTeam, addToTeam } from 'model/user';

let numTeams = 2;

// hardcoded teams
const teams = [
    {
        id: 1,
        name: 'Engineering',
        managerID: 1
    },
    {
        id: 2,
        name: 'Some Sub Team',
        managerID: 2
    }
];

// server/database get call
export const getByID = ({ teamId }) => {
    const team = teams.filter(t => t.id === teamId);
    try {
        return team[0];
    } catch (e) {
        console.log('no team with this id');
    }
};

// server/database get call
export const getSize = ({ teamId }) => {
    let result = 0;
    const users = getList();

    users.forEach(u => {
        if (u.teamIDList.includes(teamId)) {
            result++;
        }
    });

    return result;
};

// server/database get call
export const getTeamsByCurrentUser = () => {
    const currentUser = getCurrentUser();

    return teams.filter(team => currentUser.teamIDList.includes(team.id));
};

// server/database get call
export const getUsers = ({ teamID }) => {
    // return two arrays. One of users on the team specified, and one of users not on the team specified
    const users = getList();

    const onTeam = users.filter(user => user.teamIDList.includes(teamID));
    const offTeam = users.filter(user => !user.teamIDList.includes(teamID));

    return { onTeam, offTeam };
};

// server/database update call
export const setManager = ({ teamId, managerId }) => {
    const team = teams.find(team => team.id === teamId);
    try {
        if (!isOnTeam({ userID: managerId, teamID: teamId })) {
            addToTeam({ userID: managerId, teamID: teamId });
        }
        team.managerID = managerId;
    } catch (e) {
        alert(e);
    }
};

// server/database get call
export const getAllTeams = () => {
    return teams;
};

// server/database push call
export const addTeamToList = ({ teamName, managerID }) => {
    const newTeam = {
        id: numTeams + 1,
        name: teamName,
        managerID: managerID
    };
    teams.push(newTeam);
    addToTeam({ userID: managerID, teamID: newTeam.id });
    numTeams++;
    return newTeam;
};

// server/database delete call
export const removeTeamFromList = ({ teamId }) => {
    return teams.forEach((team, i) => {
        if (team.id === teamId) {
            teams.splice(i, 1);
        }
    });
};
