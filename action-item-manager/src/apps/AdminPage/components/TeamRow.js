import React from 'react';
import styled from 'styled-components';
import Dropdown from 'common/Dropdown';
import Button from 'common/Button';
import { setManager, getByID, getUsers } from '../repository';

const TableData = styled.td`
    border: 1px solid LightGrey;
    height: 100%;
    text-align: center;
    vertical-align: middle;
`;

class TeamRow extends React.Component {
    async componentDidMount() {
        const { team } = this.props;

        const allUsers = await getUsers();
        let regUsers = allUsers
            .map(user => {
                return {
                    ...user,
                    value: user._id,
                    label: `${user.firstName} ${user.lastName}`
                };
            });
        let currManager = await getByID({ userID: team.managerID });

        this.setState({
            manager: `${currManager.firstName} ${currManager.lastName}`,
            otherUsers: regUsers
        });
    }

    state = {
        manager: null,
        selectedUser: null,
        otherUsers: []
    };

    handleChange = async user => {
        const { team } = this.props;
        const { otherUsers } = this.state;

        const prevManager = await getByID({ userID: team.managerID });
        prevManager.value = prevManager._id;
        prevManager.label = `${prevManager.firstName} ${prevManager.lastName}`;

        const i = otherUsers.indexOf(user);
        otherUsers.push(prevManager);
        otherUsers.splice(i, 1);

        await setManager({ teamID: team._id, managerID: user._id });

        this.setState({
            manager: `${user.firstName} ${user.lastName}`,
            selectedUser: user,
            otherUsers: otherUsers
        });
    };

    render() {
        const { team, removeTeam } = this.props;
        const { manager, selectedUser, otherUsers } = this.state;

        return (
            <tr>
                <TableData>{team.name}</TableData>
                <TableData>
                    <Dropdown
                        placeholder={manager}
                        value={selectedUser}
                        onChange={this.handleChange}
                        options={otherUsers}
                    />
                </TableData>
                <TableData>
                    <Button text="Disband" onClick={() => removeTeam(team)} />
                </TableData>
            </tr>
        );
    }
}

export default TeamRow;
