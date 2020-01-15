import React from 'react';

import TeamTable from './TeamTable';
import UserTable from './UserTable';

import Header from 'common/Header';

class Admin extends React.Component {
    render() {
        return (
            <>
                <Header title="Welcome, Admin" />
                <TeamTable />
                <UserTable />
            </>
        );
    }
}

export default Admin;
