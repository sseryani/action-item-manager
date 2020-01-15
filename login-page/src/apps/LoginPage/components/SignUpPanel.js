import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { createUser } from '../repository';

import { COLOURS } from 'utils/constants';

const SignUpContainer = styled.div`
    border: 45px solid ${COLOURS.darkSecondary};
    align-items: center;
    background-color: ${COLOURS.darkSecondary};
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-content: center;
    min-height: 350px;
`;

const SignUpInfo = styled.input`
    color: ${COLOURS.darkPrimary};
    background-color: ${COLOURS.lightPrimary};
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
    width: 180px;
    padding: 10px;
    border: ${props => (props.error ? 'solid 1px red' : 'none')};
    border-radius: 8px;
    margin-bottom: ${props => (props.error ? '0px' : '1.5em')};
`;

const SignUpButton = styled.input`
    width: 200px;
    height: 50px;
    font-weight: 500;
    text-align: center;
    font-size: 16px;
    color: ${COLOURS.darkSecondary};
    background-color: #f87080;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    :hover {
        background-color: ${COLOURS.lightSecondary};
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
        transform: translateY(-5px);
        position: relative;
        z-index: 1;
    }
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 24px;
    color: white;
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 0.1em;
    margin-top: 0.2em;
`;

const Subtitle = styled.h3`
    font-weight: 300;
    color: white;
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 2.4em;
    margin-top: 0.2em;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
`;

class SignUpPanel extends React.Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        errors: {
            email: '',
            firsName: '',
            lastName: '',
            password: ''
        }
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { email, firstName, lastName, password } = this.state;

        if (!this.handleValidate()) {
            return;
        }

        await createUser({ email, firstName, lastName, password });
    };

    handleValidate = () => {
        const { email, firstName, lastName, password } = this.state;
        const errors = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            isValid: true
        };

        if (email.length === 0) {
            errors.email = 'Required *';
            errors.isValid = false;
        }

        if (firstName.length === 0) {
            errors.firstName = 'Required *';
            errors.isValid = false;
        }

        if (lastName.length === 0) {
            errors.lastName = 'Required *';
            errors.isValid = false;
        }

        if (password.length < 4) {
            errors.password = 'Must be at least 4 characters';
            errors.isValid = false;
        }

        this.setState({ errors });
        return errors.isValid;
    };

    render() {
        const { email, firstName, lastName, password, errors } = this.state;

        return (
            <SignUpContainer>
                <FormContainer onSubmit={this.handleSubmit}>
                    <Title>New User?</Title>
                    <Subtitle>Sign up to get started</Subtitle>
                    <SignUpInfo
                        name="email"
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={this.handleChange}
                        error={errors.email}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                    )}
                    <SignUpInfo
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={this.handleChange}
                        error={errors.firstName}
                    />
                    {errors.firstName && (
                        <ErrorMessage>{errors.firstName}</ErrorMessage>
                    )}
                    <SignUpInfo
                        name="lastName"
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        error={errors.lastName}
                    />
                    {errors.lastName && (
                        <ErrorMessage>{errors.lastName}</ErrorMessage>
                    )}
                    <SignUpInfo
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password}</ErrorMessage>
                    )}
                    <SignUpButton type="submit" value="Sign Up" />
                </FormContainer>
            </SignUpContainer>
        );
    }
}

export default SignUpPanel;
