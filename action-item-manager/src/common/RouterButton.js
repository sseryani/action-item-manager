import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getIsAdmin } from 'utils/currentUser';
import { COLOURS } from 'utils/constants';

const StyledButton = styled.button`
    width: 100%;
    height: 5vh;
    color: white;
    text-decoration: none;
    border: none;
    border-left: ${props => (props.isActive ? '4px solid red' : 'none')} 
    display: inline-block;
    background-color: ${props =>
        props.isActive ? 'black' : COLOURS.darkPrimary}; ;
    :hover {
        background-color: #363636;
        border-color: #363636;
        text-decoration: underline;
    }
    :active {
        background-color: white;
    }
    visibility: ${props =>
        !getIsAdmin() && props.title.includes('Admin') ? 'hidden' : 'visible'};
`;

class RouterButton extends React.Component {
    render() {
        const { link, title, onClick, isActive } = this.props;
        const shouldNotBeRendered =
            !getIsAdmin() && this.props.title.includes('Admin');
        if (shouldNotBeRendered) {
            return <StyledButton link={link} title={title} disabled />;
        } else {
            return (
                <Link to={link}>
                    <StyledButton
                        title={title}
                        isActive={isActive}
                        onClick={onClick}
                    >
                        {title}
                    </StyledButton>
                </Link>
            );
        }
    }
}

RouterButton.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func
};

export default RouterButton;
