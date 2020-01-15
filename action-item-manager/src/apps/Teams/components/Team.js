import React from 'react';
import styled from 'styled-components';

import ActionItemPanel from 'apps/ActionItems/components/ActionItemPanel';

import CreateActionItem from './CreateActionItem';
import ManageTeam from './ManageTeam';

import Button from 'common/Button';
import Header from 'common/Header';
import LoadingIndicator from 'common/LoadingIndicator';

import { getTeamActionItems } from '../repository';
import { ACTIONS } from '../constants';

import { canManageTeam } from 'utils/currentUser';

const TeamWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled(Button)`
    margin-top: 10px;
    margin-right: 10px;
`;

class Team extends React.Component {
    async componentDidMount() {
        const { _id } = this.props.location.state.team;
        const teamActionItems = await getTeamActionItems({ teamID: _id });
        this.setState({ loading: false, teamActionItems });
    }

    state = {
        loading: true,
        teamActionItems: [],
        page: ACTIONS.default
    };

    handleSwitchPage = page => {
        this.setState({ page });
    };

    handleCreateActionItem = actionItem => {
        const { teamActionItems } = this.state;
        teamActionItems.push(actionItem);
        this.setState({ teamActionItems });
    };

    handleDeleteActionItem = actionItemID => {
        const { teamActionItems } = this.state;
        const newActionItems = teamActionItems.filter(actionItem => actionItem._id !== actionItemID);
        this.setState({ teamActionItems: newActionItems });
    };

    renderTeamActionItems = () => {
        const { teamActionItems } = this.state;
        const { managerID } = this.props.location.state.team;

        const sortedActionItems = teamActionItems.sort((a, b) => {
            a = new Date(a.dueDate);
            b = new Date(b.dueDate);
            return a > b ? 1 : -1;
        });

        return sortedActionItems.map(actionItem => (
            <ActionItemPanel
                key={actionItem.actionItemID}
                actionItem={actionItem}
                handleDelete={() => this.handleDeleteActionItem(actionItem._id)}
                isManager={canManageTeam(managerID)}
            />
        ));
    };

    renderManagerActions = () => (
        <div>
            <StyledButton
                text="Create Action Item"
                onClick={() => this.handleSwitchPage(ACTIONS.create)}
            />
            <StyledButton
                text="Manage Team"
                onClick={() => this.handleSwitchPage(ACTIONS.manage)}
            />
        </div>
    );

    render() {
        const { name, managerID, _id } = this.props.location.state.team;
        const { loading, page } = this.state;

        return (
            <TeamWrapper>
                <Header title={name} />
                {canManageTeam(managerID) && page === ACTIONS.default
                    ? this.renderManagerActions()
                    : null}
                {loading ? (
                    <LoadingIndicator />
                ) : page === ACTIONS.create ? (
                    <CreateActionItem
                        teamID={_id}
                        handleGoBack={() =>
                            this.handleSwitchPage(ACTIONS.default)
                        }
                        handleCreateActionItem={this.handleCreateActionItem}
                    />
                ) : page === ACTIONS.manage ? (
                    <ManageTeam
                        handleGoBack={() =>
                            this.handleSwitchPage(ACTIONS.default)
                        }
                        teamID={_id}
                        managerID={managerID}
                    />
                ) : (
                    this.renderTeamActionItems()
                )}
            </TeamWrapper>
        );
    }
}

export default Team;
