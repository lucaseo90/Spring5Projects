import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {WorldgdpSharedModule} from 'app/shared/shared.module';
import {SEARCH_COUNTRIES_ROUTE} from './search-countries.route';
import {SearchCountriesComponent} from './search-countries.component';

@NgModule({
  imports: [WorldgdpSharedModule, RouterModule.forChild([SEARCH_COUNTRIES_ROUTE])],
  declarations: [SearchCountriesComponent],
})
export class WolrdgdpSearchCountriesModule {
}
