import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';

import Button from 'common/Button';

const PanelWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    border: 1px solid ${COLOURS.darkPrimary};
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.h4`
    margin-left: 18px;
`;

const SideButton = styled(Button)`
    border-radius: 4px;
    visibility: ${props => (props.shouldRender ? 'visible' : 'hidden')};
`;

class UserPanel extends React.Component {
    render() {
        const { user, handleRemoveUser, isNotManager } = this.props;

        return (
            <PanelWrapper>
                <Text>{`${user.firstName} ${user.lastName}`} </Text>
                <SideButton
                    text="remove"
                    onClick={handleRemoveUser}
                    shouldRender={isNotManager}
                />
            </PanelWrapper>
        );
    }
}

UserPanel.propTypes = {
    user: PropTypes.object.isRequired,
    handleRemoveUser: PropTypes.func.isRequired
};

export default UserPanel;
