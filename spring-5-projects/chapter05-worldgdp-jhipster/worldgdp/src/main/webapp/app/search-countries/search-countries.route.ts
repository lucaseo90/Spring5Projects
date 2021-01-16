import { Route } from '@angular/router';

import { SearchCountriesComponent } from './search-countries.component';

export const SEARCH_COUNTRIES_ROUTE: Route = {
  path: '',
  component: SearchCountriesComponent,
  data: {
    authorities: [],
  }
};
