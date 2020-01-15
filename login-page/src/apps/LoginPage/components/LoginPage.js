import React from 'react';
import styled from 'styled-components';

import LoginPanel from './LoginPanel';
import SignUpPanel from './SignUpPanel';

import { COLOURS } from 'utils/constants';

const PanelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(
        to bottom right,
        ${COLOURS.darkPrimary},
        #bcb8b1,
        #834a75
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const LoginRegister = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
`;

class LoginPage extends React.Component {
    render() {
        return (
            <PanelWrapper>
                <LoginRegister>
                    <SignUpPanel />
                    <LoginPanel />
                </LoginRegister>
            </PanelWrapper>
        );
    }
}

LoginPage.propTypes = {};

export default LoginPage;
