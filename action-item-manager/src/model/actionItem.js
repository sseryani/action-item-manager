import { getCurrentUser } from 'utils/currentUser';

// hardcoded action items
const actionItems = [
    {
        actionItemID: 1,
        title: 'Some Title for Some Action Item',
        description:
            'The following are the steps to do something: 1. turn off your computer, 2. go home',
        teamID: 1,
        dueDate: '2019-12-12',
        dateCreated: '2019-01-01',
        userIDList: []
    },
    {
        actionItemID: 2,
        title: 'Some Other Title for Some Other Action Item',
        description:
            'Some other description to complete some task you probably dont want to do',
        teamID: 1,
        dueDate: '2019-12-12',
        dateCreated: '2019-01-01',
        userIDList: []
    },
    {
        actionItemID: 3,
        title: 'Action Item for Team 2',
        description:
            'Some other description to complete some task you probably dont want to do',
        teamID: 2,
        dueDate: '2019-12-12',
        dateCreated: '2019-01-01',
        userIDList: []
    }
];
let actionItemsCounter = 4;

// server/database push call
export const create = ({ teamID, title, description, dueDate }) => {
    const newActionItem = {
        actionItemID: actionItemsCounter,
        title,
        description,
        teamID,
        dueDate,
        dateCreated: '2019-01-01',
        userIDList: []
    };

    actionItems.push(newActionItem);
    actionItemsCounter++;

    return newActionItem;
};

// server/database get call
export const getByID = ({ id }) => {
    const ai = actionItems.filter(a => a.actionItemID === id);
    try {
        return ai[0];
    } catch (e) {
        console.log('no action item with this id');
    }
};

// server/database update call
export const update = ({ id, newTitle, newDesc, newDueDate }) => {
    const ai = actionItems.filter(a => a.actionItemID === id);
    try {
        ai[0].title = newTitle;
        ai[0].description = newDesc;
        ai[0].dueDate = newDueDate;
    } catch (e) {
        console.log('no action item with this id');
    }
};

// server/database get call
export const getByTeam = ({ teamID }) => {
    return actionItems.filter(actionItem => actionItem.teamID === teamID);
};

// server/database get call
export const getByCurrentUser = () => {
    const currentUser = getCurrentUser();

    return actionItems.filter(actionItem =>
        currentUser.teamIDList.includes(actionItem.teamID)
    );
};

// server/database update call
export const toggleActionItemComplete = ({
    userID,
    actionItemID,
    isComplete
}) => {
    actionItems.forEach(actionItem => {
        if (actionItem.actionItemID === actionItemID) {
            if (isComplete) {
                actionItem.userIDList.push(userID);
            } else {
                const index = actionItem.userIDList.indexOf(userID);
                actionItem.userIDList.splice(index, 1);
            }
        }
    });
};

// server/database get call
export const didComplete = ({ userID, actionItemID }) => {
    // let completed = false;
    //
    // actionItems.forEach(actionItem => {
    //     if (actionItem.actionItemID === actionItemID) {
    //         const index = actionItem.userIDList.indexOf(userID);
    //         completed = index !== -1;
    //     }
    // });
    //
    // return completed;
    return false;
};
