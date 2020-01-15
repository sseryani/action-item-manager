import React from 'react';
import PropTypes from 'prop-types';

import Button from 'common/Button';
import Dropdown from 'common/Dropdown';
import UserPanel from 'common/UserPanel';
import styled from 'styled-components';

import { getTeamUsers, addUserToTeam, removeUserFromTeam } from '../repository';

const DropdownWrapper = styled.div`
    display: flex;
    direction: row;
    margin-top: 50px;
    margin-bottom: 30px;
    align-items: center;
`;

const BackButton = styled(Button)`
    margin-top: 80px;
    height: 35px;
    width: 100px;
    margin-left: 160px;
`;

const AddText = styled.strong`
    padding-right: 40px;
    font-size: 20px;
`;

const AddButton = styled(Button)`
    margin-left: 40px;
`;

const UsersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 160px;
    padding-right: 320px;
`;

class ManageTeam extends React.Component {
    async componentDidMount() {
        const { teamID, managerID } = this.props;

        let { onTeam, offTeam } = await getTeamUsers({ teamID });

        offTeam = offTeam.map(user => {
            return {
                ...user,
                value: user.id,
                label: `${user.firstName} ${user.lastName}`
            };
        });
        onTeam = onTeam.map(user => {
            return {
                ...user,
                value: user.id,
                label: `${user.firstName} ${user.lastName}`
            };
        });

        this.setState({
            offTeam,
            onTeam,
            loading: false,
            managerID
        });
    }

    state = {
        loading: true,
        selectedUser: null,
        offTeam: [],
        onTeam: [],
        managerID: null
    };

    handleAddUser = async () => {
        const { teamID } = this.props;
        const { selectedUser, offTeam, onTeam } = this.state;

        if (selectedUser === null) {
            return;
        }

        await addUserToTeam({ userID: selectedUser._id, teamID });

        const index = offTeam.indexOf(selectedUser);
        offTeam.splice(index, 1);
        onTeam.push(selectedUser);

        this.setState({ selectedUser: null, onTeam, offTeam });
    };

    handleRemoveUser = async user => {
        const { teamID } = this.props;
        const { offTeam, onTeam } = this.state;

        await removeUserFromTeam({ userID: user._id, teamID });

        const index = onTeam.indexOf(user);
        onTeam.splice(index, 1);
        offTeam.push(user);
        this.setState({ onTeam, offTeam });
    };

    handleChange = user => {
        this.setState({ selectedUser: user });
    };

    renderUsers = () => {
        const { onTeam, managerID } = this.state;
        return onTeam.map(user => (
            <UserPanel
                key={user._id}
                user={user}
                handleRemoveUser={() => this.handleRemoveUser(user)}
                isNotManager={user._id !== managerID}
            />
        ));
    };

    render() {
        const { handleGoBack } = this.props;
        const { selectedUser, offTeam } = this.state;

        return (
            <div>
                <DropdownWrapper>
                    <AddText>Add a new user:</AddText>
                    <Dropdown
                        placeholder="Select User..."
                        value={selectedUser}
                        onChange={this.handleChange}
                        options={offTeam}
                    />
                    <AddButton text="Add User" onClick={this.handleAddUser} />
                </DropdownWrapper>
                <UsersWrapper>
                    <h3>Current Team Members:</h3>
                    {this.renderUsers()}
                </UsersWrapper>
                <BackButton text="Go Back" onClick={handleGoBack}>
                    {' '}
                </BackButton>
            </div>
        );
    }
}

ManageTeam.propTypes = {
    handleGoBack: PropTypes.func.isRequired,
    teamID: PropTypes.number.isRequired
};

export default ManageTeam;
