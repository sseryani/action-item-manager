import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';

import Dropdown from 'common/Dropdown';
import Input from 'common/Input';
import SubmitButton from 'common/SubmitButton';

import { getUsers } from '../repository';
import { getCurrentUser } from 'utils/currentUser';
import Label from 'common/Label';

const CreateTeam = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
`;

class AddTeamForm extends React.Component {
    async componentDidMount() {
        const allUsers = (await getUsers()).map(user => {
            return {
                ...user,
                value: user._id,
                label: `${user.firstName} ${user.lastName}`
            };
        });

        this.setState({
            users: allUsers,
            selectedUser: getCurrentUser()
        });
    }

    state = {
        users: [],
        teamName: '',
        selectedUser: null
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    handleUserChange = user => {
        this.setState({ selectedUser: user });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { handleAddTeam } = this.props;
        const { teamName, selectedUser } = this.state;
        if (teamName.length === 0) {
            alert('You have not entered a team name. Please try again.');
            return;
        }

        handleAddTeam(teamName, selectedUser);
    };

    render() {
        const { users, selectedUser, teamName } = this.state;

        return (
            <CreateTeam>
                <h2>Create A New Team</h2>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        label="Name"
                        type="text"
                        value={teamName}
                        name="teamName"
                        handleChange={this.handleChange}
                    />
                    <Label label="Manager">
                        <Dropdown
                            placeholder="Select Team Manager"
                            value={selectedUser}
                            onChange={this.handleUserChange}
                            options={users}
                        />
                    </Label>
                    <SubmitButton value="Create Team" />
                </form>
            </CreateTeam>
        );
    }
}

AddTeamForm.propTypes = {
    handleAddTeam: PropTypes.func.isRequired
};

export default AddTeamForm;
