import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Panel from 'common/Panel';
import Button from 'common/Button';

import { didComplete, getTeamByID, deleteActionItem } from '../repository';
import { getCurrentUser } from 'utils/currentUser';

const CompletedIcon = styled.div`
    width: 100px;
    height: 25px;
    background: green;
    color: white;
    text-align: center;
    border-radius: 4px;
    margin-right: 20px;
    float: left;
`;

const IncompleteIcon = styled.div`
    width: 100px;
    height: 25px;
    background: red;
    color: white;
    text-align: center;
    border-radius: 4px;
    margin-right: 20px;
    float: left;
`;

const ActionItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center
`;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const DisplayWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledDate = styled.div`
    font-size: 16px;
    margin-right: 20px;
`;

const StyledButton = styled(Button)`
    padding-right: 20px;
`;

class ActionItemPanel extends React.Component {
    async componentDidMount() {
        const { displayTeamName, actionItem } = this.props;
        const { teamID, _id } = actionItem;
        const currentUser = getCurrentUser();
        const complete = await didComplete({
            userID: currentUser._id,
            actionItemID: _id
        });
        this.setState({ complete });
        if (displayTeamName) {
            const team = await getTeamByID({ teamID });
            this.setState({ team });
        }
    }

    state = {
        team: null,
        complete: null
    };

    handleDelete = async e => {
        e.stopPropagation();

        const { handleDelete, actionItem } = this.props;
        const { _id } = actionItem;

        await deleteActionItem({ actionItemID: _id });
        handleDelete();
    };

    renderComplete = () => {
        const { complete } = this.state;
        if (complete) {
            return <CompletedIcon> Completed </CompletedIcon>;
        } else {
            return <IncompleteIcon> Incomplete </IncompleteIcon>;
        }
    };

    render() {
        const { actionItem, history, isManager } = this.props;
        const { _id, title, dueDate } = actionItem;
        const { team } = this.state;

        const navigateParams = {
            pathname: `/action-items/${_id}`,
            state: { actionItem }
        };

        return (
            <Panel onClick={() => history.push(navigateParams)}>
                <ActionItemWrapper>
                    <DisplayWrapper>
                        <Top>
                            {this.renderComplete()}
                            <StyledDate>Due Date: {dueDate}</StyledDate>
                            {team && <b>{team.name}</b>}
                        </Top>
                        <h1>{title}</h1>
                    </DisplayWrapper>
                    {isManager && (
                        <Button text="Delete" onClick={this.handleDelete} />
                    )}
                </ActionItemWrapper>
            </Panel>
        );
    }
}

ActionItemPanel.propTypes = {
    actionItem: PropTypes.object.isRequired,
    displayTeamName: PropTypes.bool,
    handleDelete: PropTypes.func,
    isManager: PropTypes.bool
};

ActionItemPanel.defaultProps = {
    displayTeamName: false,
    handleDelete: () => {},
    isManager: false
};

export default withRouter(ActionItemPanel);
