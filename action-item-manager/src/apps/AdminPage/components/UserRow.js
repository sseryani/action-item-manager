import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'common/Button';

import { ROLES_STRING } from 'utils/constants';

const TableData = styled.td`
    border: 1px solid LightGrey;
    height: 100%;
    text-align: center;
    vertical-align: middle;
`;

class UserRow extends React.Component {
    renderRemove() {
        const { isAdmin, user, handleRemoveUser } = this.props;
        return isAdmin ? (
            <></>
        ) : (
            <Button text="Remove" onClick={() => handleRemoveUser(user._id)} />
        );
    }
    render() {
        const { user } = this.props;

        return (
            <tr>
                <TableData>{user.firstName}</TableData>
                <TableData>{user.lastName}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{ROLES_STRING[user.role]}</TableData>
                <TableData>{this.renderRemove()}</TableData>
            </tr>
        );
    }
}

UserRow.propTypes = {
    user: PropTypes.object.isRequired,
    handleRemoveUser: PropTypes.func.isRequired
};

export default UserRow;
