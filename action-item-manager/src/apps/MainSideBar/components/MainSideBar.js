import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { logout } from '../repository';
import RouterButton from 'common/RouterButton';

const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 25vh;
    border-right: 0.5px solid black;
    background: #2b2b2b;
`;

class MainSideBar extends React.Component {
    state = { activeButton: 'Dashboard' };

    handleClick = e => {
        this.setState({ activeButton: e.target.innerText });
    };

    render() {
        return (
            <SideBarWrapper>
                <RouterButton
                    link="/account-info"
                    title="Account Info"
                    onClick={this.handleClick}
                    isActive={'Account Info' === this.state.activeButton}
                />
                <RouterButton
                    link="/teams"
                    title="Teams"
                    onClick={this.handleClick}
                    isActive={'Teams' === this.state.activeButton}
                />
                <RouterButton
                    link="/action-items"
                    title="Action Items"
                    onClick={this.handleClick}
                    isActive={'Action Items' === this.state.activeButton}
                />
                <RouterButton
                    link="/admin-page"
                    title="Admin Page"
                    onClick={this.handleClick}
                    isActive={'Admin Page' === this.state.activeButton}
                />
                <RouterButton
                    link="/"
                    title="Logout"
                    onClick={logout}
                    isActive={false}
                />
            </SideBarWrapper>
        );
    }
}

MainSideBar.propTypes = {
};

export default withRouter(MainSideBar);
