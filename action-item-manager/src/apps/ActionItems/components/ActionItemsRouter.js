import React from 'react';
import { Route } from 'react-router-dom';

import ActionItemList from './ActionItemList';
import ActionItem from './ActionItem';

class ActionItemsRouter extends React.Component {
    render() {
        const { path } = this.props.match;
        return (
            <div>
                <Route exact path={path} component={ActionItemList} />
                <Route path={`${path}/:id`} component={ActionItem} />
            </div>
        );
    }
}

export default ActionItemsRouter;
