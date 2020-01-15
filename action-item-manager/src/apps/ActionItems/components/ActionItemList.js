import React from 'react';

import ActionItemPanel from './ActionItemPanel';

import Header from 'common/Header';
import LoadingIndicator from 'common/LoadingIndicator';

import { getActionItemsForCurrentUser } from '../repository';

class ActionItemList extends React.Component {
    async componentDidMount() {
        const actionItems = await getActionItemsForCurrentUser();
        this.setState({ loading: false, actionItems });
    }

    state = {
        loading: true,
        actionItems: []
    };

    renderActionItems = () => {
        const { actionItems } = this.state;
        const sortedActionItems = actionItems.sort((a, b) => {
            a = new Date(a.dueDate);
            b = new Date(b.dueDate);
            return a > b ? 1 : -1;
        });

        return sortedActionItems.map(actionItem => (
            <ActionItemPanel
                key={actionItem._id}
                actionItem={actionItem}
                displayTeamName={true}
            />
        ));
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                <Header title="My Action Items" />
                {loading ? <LoadingIndicator /> : this.renderActionItems()}
            </>
        );
    }
}

export default ActionItemList;
