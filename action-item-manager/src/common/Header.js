import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { COLOURS } from 'utils/constants';

const StyledBold = styled.b`
    font-size: ${props => `${props.size}px`}
    color: ${COLOURS.darkPrimary};
    margin-bottom: 40px;
    font-weight: 500;
`;

const Header = ({ title, size }) => {
    switch (size) {
        case 'small':
            size = '18';
            break;
        case 'medium':
            size = '25';
            break;
        case 'large':
            size = '38';
    }

    return <StyledBold size={size}>{title}</StyledBold>;
};

Header.propTypes = {
    size: PropTypes.string
};

Header.defaultProps = {
    size: 'large'
};

export default Header;
