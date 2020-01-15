import React from 'react';
import styled from 'styled-components';

import { getCurrentUser } from 'utils/currentUser';
import { ACCTPAGES, ROLENAMES } from '../constants';
import Button from 'common/Button';
import Header from 'common/Header';
import ChangeInfo from './ChangeInfo';
import ChangePassword from './ChangePassword';

const SidebarWrapper = styled.div`
    margin-right: auto;
`;

const ProfileLine = styled.div`
    margin-top: 5px;
    margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
    margin-left: 10px;
`;

const ProfileCategories = styled.text`
    font-weight: bold;
    font-size: 20px;
`;

class AccountInfo extends React.Component {
    state = {
        currentUser: getCurrentUser(),
        page: ACCTPAGES.default,
    };

    handleSwitchPage = page => {
        this.setState({ page });
    };

    updateStateInfo = ( {firstName, lastName, email} ) => {
        const { currentUser } = this.state; 
        this.setState({currentUser: {...currentUser, firstName, lastName, email}});
    };

    renderAccountInfo = () => {
        const { firstName, lastName, email, role } = this.state.currentUser;
        return (
            <>
                <SidebarWrapper />
                <Header title="Account Info" />
                <ProfileLine>
                    <ProfileCategories>First Name:</ProfileCategories>{' '}
                    {firstName}
                </ProfileLine>
                <ProfileLine>
                    <ProfileCategories>Last Name:</ProfileCategories> {lastName}
                </ProfileLine>
                <ProfileLine>
                    <ProfileCategories>Username:</ProfileCategories> {email}
                </ProfileLine>
                <ProfileLine>
                    <ProfileCategories>Role:</ProfileCategories>{' '}
                    {ROLENAMES[role]}
                </ProfileLine>
                <Button
                    text="Edit Password"
                    onClick={() =>
                        this.handleSwitchPage(ACCTPAGES.changepassword)
                    }
                />
                <StyledButton
                    text="Edit Profile"
                    onClick={() => this.handleSwitchPage(ACCTPAGES.changeinfo)}
                />
            </>
        );
    };

    render() {
        const { page, currentUser } = this.state;
        return (
            <>
                {page === ACCTPAGES.default ? (
                    this.renderAccountInfo()
                ) : page === ACCTPAGES.changepassword ? (
                    <ChangePassword handleSwitchPage={this.handleSwitchPage} />
                ) : page === ACCTPAGES.changeinfo ? (
                    <ChangeInfo 
                        updateStateInfo={this.updateStateInfo}
                        handleSwitchPage={this.handleSwitchPage}
                        currentUser={currentUser}
                    />
                ) : null}
            </>
        );
    }
}

export default AccountInfo;
