import React from 'react';
import { Route } from 'react-router-dom';

import TeamList from './TeamList';
import Team from './Team';

class ActionItemsRouter extends React.Component {
    render() {
        const { path } = this.props.match;
        return (
            <div>
                <Route exact path={path} component={TeamList} />
                <Route path={`${path}/:id`} component={Team} />
            </div>
        );
    }
}

export default ActionItemsRouter;
