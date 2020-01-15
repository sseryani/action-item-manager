import React from 'react';
import styled from 'styled-components';

import TeamPanel from './TeamPanel';

import Header from 'common/Header';
import LoadingIndicator from 'common/LoadingIndicator';
import { getCurrentUser } from 'utils/currentUser';

import { getTeams } from '../repository';

const TeamsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 70px;
    border-bottom : ${props => props.last ? 'none' : '1px solid black'}; 
`;

class TeamList extends React.Component {
    async componentDidMount() {
        const { managedTeams, participantTeams } = this.state;
        const teams = await getTeams();
        const id = getCurrentUser()._id;
        teams.forEach(team => {
            if (team.managerID === id) {
                managedTeams.push(team);
            } else {
                participantTeams.push(team);
            }
        });
        this.setState({
            loading: false,
            teams,
            managedTeams,
            participantTeams
        });
    }

    state = {
        loading: true,
        managedTeams: [],
        participantTeams: []
    };

    renderTeams = () => {
        const { managedTeams, participantTeams } = this.state;
        const managingTitle = 'Teams Managing';
        const participatingTitle = 'Teams Participating';

        if (managedTeams.length === 0 && participantTeams.length === 0) {
            return <h3>You have no teams</h3>
        } else if (managedTeams.length !== 0 && participantTeams.length === 0) {
            return (
                <>
                    <h2>{managingTitle}</h2>
                    <TeamsWrapper last={true}>
                        {managedTeams.map(team => (
                            <TeamPanel key={team._id} team={team} />
                        ))}
                    </TeamsWrapper>
                </>
            );
        } else if (managedTeams.length === 0 && participantTeams.length !== 0) {
            return (
                <>
                    <h2>{participatingTitle}</h2>
                    <TeamsWrapper last={true}>
                        {participantTeams.map(team => (
                            <TeamPanel key={team._id} team={team} />
                        ))}
                    </TeamsWrapper>
                </>
            );
        } else {
            return (
                <>
                    <h2>{managingTitle}</h2>
                    <TeamsWrapper last={false}>
                        {managedTeams.map(team => (
                            <TeamPanel key={team._id} team={team} />
                        ))}
                    </TeamsWrapper>
                    <h2>{participatingTitle}</h2>
                    <TeamsWrapper last={true}>
                        {participantTeams.map(team => (
                            <TeamPanel key={team._id} team={team} />
                        ))}
                    </TeamsWrapper>
                </>
            );
        }
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                <Header title="My Teams" />
                {loading ? <LoadingIndicator /> : this.renderTeams()}
            </>
        );
    }
}

export default TeamList;
