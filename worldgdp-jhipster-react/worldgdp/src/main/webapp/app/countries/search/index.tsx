import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Country from './country';
import CountryGdp from "./country-gdp";

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/:code`} component={CountryGdp}/>
      <ErrorBoundaryRoute path={match.url} component={Country}/>
    </Switch>
  </>
);

export default Routes;
