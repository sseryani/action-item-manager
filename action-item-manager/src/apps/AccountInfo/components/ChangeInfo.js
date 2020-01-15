import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ACCTPAGES } from '../constants';
import { getCurrentUser } from 'utils/currentUser';
import { submitInfo } from '../repository';
import Input from 'common/Input';
import Label from 'common/Label';
import Button from 'common/Button';
import SubmitButton from 'common/SubmitButton';

const StyledButton = styled(Button)`
    margin-top: 10px;
    margin-left: 10px;
`;

class ChangeInfo extends React.Component {
    componentDidMount() {
        const { firstName, lastName, email } = this.props.currentUser;

        this.setState({ firstName, lastName, email });
    }

    state = {
        firstName: '',
        lastName: '',
        email: '',
        userID: getCurrentUser()._id
    };

    handleSubmit = e => {
        e.preventDefault();
        const { firstName, lastName, email, userID } = this.state;
        const { handleSwitchPage } = this.props;
        const { updateStateInfo } = this.props;

        if (
            firstName.length === 0 ||
            lastName.length === 0 ||
            email.length === 0
        ) {
            alert(
                'One of first name, last name or email is empty. Please try again.'
            );
            return;
        }

        submitInfo({ userID, firstName, lastName, email });
        updateStateInfo({ firstName, lastName, email });
        handleSwitchPage(ACCTPAGES.default);
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    render() {
        const { handleSwitchPage } = this.props;
        const { firstName, lastName, email } = this.state;

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <Label label="">
                        <Input
                            label="First Name:"
                            type="text"
                            name="firstName"
                            value={firstName}
                            handleChange={this.handleChange}
                        />
                    </Label>
                    <Label label="">
                        <Input
                            label="Last Name:"
                            type="text"
                            name="lastName"
                            value={lastName}
                            handleChange={this.handleChange}
                        />
                    </Label>
                    <Label label="">
                        <Input
                            label="Username:"
                            type="text"
                            name="email"
                            value={email}
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

ChangeInfo.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired,
    updateStateInfo: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
};

export default ChangeInfo;
