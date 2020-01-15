import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLabel = styled.label`
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
    width: 520px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

class Label extends React.Component {
    render() {
        const { label, children } = this.props;

        return (
            <StyledLabel>
                {label}
                {children}
            </StyledLabel>
        );
    }
}

Label.propTypes = {
    label: PropTypes.string.isRequired
};

export default Label;
