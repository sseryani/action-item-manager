import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLOURS } from 'utils/constants';

const StyledButton = styled.button`
    background: ${COLOURS.darkPrimary};
    color: ${COLOURS.lightPrimary};
    border-color: ${COLOURS.darkPrimary};
    padding: 4px 10px;
    max-height: 35px;
    :hover {
        cursor: pointer;
        background: ${COLOURS.darkSecondary};
    }
`;

class Button extends React.Component {
    render() {
        const { text, onClick, className } = this.props;

        return (
            <StyledButton type="button" className={className} onClick={onClick}>
                {text}
            </StyledButton>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Button;
