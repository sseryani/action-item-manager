import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';

const TeamName = styled.b`
    font-size: 30px;
`;

const Panel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    min-width: 200px;
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

const TeamPanel = ({ team, history }) => {
    const { _id, name, managerID } = team;

    const navigateParams = {
        pathname: `/teams/${_id}`,
        state: { team }
    };

    return (
        <Panel onClick={() => history.push(navigateParams)}>
            <TeamName>{name}</TeamName>
        </Panel>
    );
};

TeamPanel.propTypes = {
    team: PropTypes.object.isRequired
};

export default withRouter(TeamPanel);
