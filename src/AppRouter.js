import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from './containers/login/LoginWrapper';
import Workspace from './v2/containers/Workspace';
import PrivateRoute from './components/PrivateRoute';
import UnauthRoute from './components/UnauthRoute';
import StoreGroupSelect from './v2/containers/StoreGroupSelect';
import NotFound from './v2/containers/NotFound';

const AppRouter = () => {
    const match = useRouteMatch();

    console.log('app router match', match);

    return (
        <Switch>
            <UnauthRoute path='/login'>
                <Login/>
            </UnauthRoute>
            <PrivateRoute path='/storeGroups' exact>
                <StoreGroupSelect/>
            </PrivateRoute>
            <PrivateRoute path='/:store_group_code/workspace'>
                <Workspace/>
            </PrivateRoute>
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default AppRouter;