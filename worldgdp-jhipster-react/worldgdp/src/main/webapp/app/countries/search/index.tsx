import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Country from './country';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={match.url} component={Country}/>
    </Switch>
  </>
);

export default Routes;
