let numUsers = 5;

// hardcoded users
const users = [
    {
        id: 0,
        firstName: 'admin',
        lastName: '',
        email: 'admin',
        password: 'admin',
        teamIDList: [1],
        role: 1,
        dateLastLoggedIn: '2019-01-01'
    },
    {
        id: 1,
        firstName: 'Lucas',
        lastName: 'G',
        email: 'user',
        password: 'user',
        teamIDList: [1, 2],
        role: 0,
        dateLastLoggedIn: '2019-01-01'
    },
    {
        id: 2,
        firstName: 'Joey',
        lastName: 'W',
        email: 'user2',
        password: 'user2',
        teamIDList: [1, 2],
        role: 0,
        dateLastLoggedIn: '2019-01-01'
    },
    {
        id: 3,
        firstName: 'Alex',
        lastName: 'E',
        email: 'user3',
        password: 'user3',
        teamIDList: [1],
        role: 0,
        dateLastLoggedIn: '2019-01-01'
    },
    {
        id: 4,
        firstName: 'Sandro',
        lastName: 'S',
        email: 'user4',
        password: 'user4',
        teamIDList: [2],
        role: 0,
        dateLastLoggedIn: '2019-01-01'
    }
];

// server/database get call
export const isUser = ({ email, password }) => {
    let user;
    users.forEach(registeredUser => {
        if (
            email === registeredUser.email &&
            password === registeredUser.password
        ) {
            user = registeredUser;
        }
    });
    return user;
};

// server/database get call
export const isOnTeam = ({ userID, teamID }) => {
    const user = getByID({ userID: userID });
    return user.teamIDList.includes(teamID);
};

// server/database get call
export const getList = () => users;

// server/database get call
export const getByID = ({ userID }) => {
    return users.find(user => user.id === userID);
};

// server/database push call
export const create = ({ email, firstName, lastName, role }) => {
    const newUser = {
        id: numUsers,
        firstName,
        lastName,
        email,
        password: 'admin',
        teamIDList: [],
        role,
        dateLastLoggedIn: '2019-01-01'
    };
    users.push(newUser);

    numUsers += 1;
    return newUser;
};

// server/database delete call
export const remove = ({ userID }) => {
    users.forEach((user, i) => {
        if (user.id === userID) {
            users.splice(i, 1);
        }
    });
};

// server/database push call
export const addToTeam = ({ userID, teamID }) => {
    users.forEach(user => {
        if (user.id === userID) {
            user.teamIDList.push(teamID);
        }
    });
};

// server/database delete call
export const removeFromTeam = ({ userID, teamID }) => {
    users.forEach(user => {
        if (user.id === userID) {
            const index = user.teamIDList.indexOf(teamID);
            user.teamIDList.splice(index, 1);
        }
    });
};

// server/database update call
export const changePassword = ({ userID, password }) => {
    users.forEach(user => {
        if (user.id === userID) {
            user.password = password;
        }
    });
};

// server/database update call
export const changeInfo = ({ userID, firstName, lastName, email }) => {
    users.forEach(user => {
        if (user.id === userID) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
        }
    });
};
