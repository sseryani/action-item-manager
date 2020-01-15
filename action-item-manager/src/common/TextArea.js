import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLOURS } from 'utils/constants';

const StyledLabel = styled.label`
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
    width: 520px;
    display: flex;
    justify-content: space-between;
`;

const StyledTextArea = styled.textarea`
    border-radius: 5px;
    border-color: ${COLOURS.darkPrimary};
    width: 398px;
    height: 100px;
    resize: none;
`;

class Input extends React.Component {
    render() {
        const { label, handleChange, name, value, placeholder } = this.props;

        return (
            <StyledLabel>
                {label}
                <StyledTextArea
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </StyledLabel>
        );
    }
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

Input.defaultProps = {
    placeholder: ''
};

export default Input;
