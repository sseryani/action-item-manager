import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'common/Button';
import { ACCTPAGES } from '../constants';
import { getCurrentUser } from 'utils/currentUser';
import { submitPassword } from '../repository';
import Input from 'common/Input';
import Label from 'common/Label';
import SubmitButton from 'common/SubmitButton';

const StyledButton = styled(Button)`
    margin-top: 10px;
    margin-left: 10px;
`;

class ChangePassword extends React.Component {
    state = {
        password: '',
        userID: getCurrentUser()._id
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { userID, password } = this.state;
        const { handleSwitchPage } = this.props;
        if (password.length === 0) {
            alert('Password cannot be empty. Please try again.');
            return;
        }

        submitPassword({ userID, password });
        handleSwitchPage(ACCTPAGES.default);
    };

    handleChange = event => {
        this.setState({ password: event.target.value });
    };

    render() {
        const { handleSwitchPage } = this.props;
        const { password } = this.state;

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <Label label="">
                        <Input
                            label="New Password:"
                            type="text"
                            name="password"
                            value={password}
                            handleChange={this.handleChange}
                        />
                    </Label>
                    <SubmitButton value="Submit" />
                    <StyledButton
                        text="Cancel"
                        onClick={() => handleSwitchPage(ACCTPAGES.default)}
                    />
                </form>
            </>
        );
    }
}

ChangePassword.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangePassword;
