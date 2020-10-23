import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CountryLanguage from './country-language';
import CountryLanguageDetail from './country-language-detail';
import CountryLanguageUpdate from './country-language-update';
import CountryLanguageDeleteDialog from './country-language-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CountryLanguageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CountryLanguageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CountryLanguageDetail} />
      <ErrorBoundaryRoute path={match.url} component={CountryLanguage} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CountryLanguageDeleteDialog} />
  </>
);

export default Routes;
