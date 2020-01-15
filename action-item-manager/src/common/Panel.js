import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { COLOURS } from 'utils/constants';

const StyledDiv = styled.div`
    margin-top: 20px;
    margin-right: 20px;
    padding: 20px;
    border: 0.5px solid black;
    border-radius: 2px;
    color: ${COLOURS.darkPrimary};
    background: ${COLOURS.lightPrimary}
    border-color: ${COLOURS.darkPrimary}
    border-width: 2px;
    ${props =>
        props.onClick
            ? `:hover { cursor: pointer; background: ${
                  COLOURS.lightSecondary
              } }`
            : ''}
`;

const Panel = ({ children, onClick, className }) => (
    <StyledDiv className={className} onClick={onClick}>
        {children}
    </StyledDiv>
);

Panel.propTypes = {
    onClick: PropTypes.func
};

Panel.defaultProps = {
    onClick: null
};

export default Panel;
