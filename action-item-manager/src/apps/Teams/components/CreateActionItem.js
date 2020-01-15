import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'common/Button';
import Input from 'common/Input';
import TextArea from 'common/TextArea';
import SubmitButton from 'common/SubmitButton';

import { createActionItem } from '../repository';

const StyledButton = styled(Button)`
    margin-top: 10px;
`;

class CreateActionItem extends React.Component {
    state = {
        title: '',
        description: '',
        dueDate: ''
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { handleGoBack, handleCreateActionItem, teamID } = this.props;
        const { title, description, dueDate } = this.state;

        if (title.length === 0 || description.length === 0) {
            alert('One of title or description is empty. Please try again.');
            return;
        }

        const newActionItem = await createActionItem({
            teamID,
            title,
            description,
            dueDate
        });
        handleCreateActionItem(newActionItem);
        handleGoBack();
    };

    render() {
        const { handleGoBack } = this.props;
        const { title, description, dueDate } = this.state;

        return (
            <div>
                <StyledButton text="Back" onClick={handleGoBack} />
                <form onSubmit={this.handleSubmit}>
                    <Input
                        label="Title"
                        type="text"
                        value={title}
                        name="title"
                        handleChange={this.handleChange}
                    />
                    <TextArea
                        label="Description"
                        handleChange={this.handleChange}
                        name="description"
                        value={description}
                    />
                    <Input
                        label="Due Date"
                        type="date"
                        value={dueDate}
                        name="dueDate"
                        handleChange={this.handleChange}
                    />
                    <SubmitButton value="Assign Action Item to Team" />
                </form>
            </div>
        );
    }
}

CreateActionItem.propTypes = {
    handleGoBack: PropTypes.func.isRequired,
    handleCreateActionItem: PropTypes.func.isRequired,
    teamID: PropTypes.number.isRequired
};

export default CreateActionItem;
