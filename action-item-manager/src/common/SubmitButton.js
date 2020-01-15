import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLOURS } from 'utils/constants';

const StyledSubmit = styled.input`
    margin-top: 10px;
    background: ${COLOURS.darkPrimary};
    color: ${COLOURS.lightPrimary};
    border-color: ${COLOURS.darkPrimary};
    padding: 4px 10px;
    :hover {
        cursor: pointer;
        background: ${COLOURS.darkSecondary};
    }
`;

class SubmitButton extends React.Component {
    render() {
        const { value } = this.props;

        return <StyledSubmit type="submit" value={value} />;
    }
}

SubmitButton.propTypes = {
    value: PropTypes.string.isRequired
};

export default SubmitButton;
