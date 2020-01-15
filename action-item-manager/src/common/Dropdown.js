import React from 'react';
import Select from 'react-select';

class Dropdown extends React.Component {
    render() {
        const { placeholder, value, onChange, options } = this.props;

        const customStyles = {
            control: styles => ({
                ...styles,
                height: 35,
                minHeight: 35,
                width: 400
            }),
            option: styles => ({
                ...styles,
                width: 403,
                height: 35
            }),
            container: styles => ({
                ...styles,
                width: 400
            })
        };

        return (
            <Select
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                options={options}
                styles={customStyles}
            />
        );
    }
}

export default Dropdown;
