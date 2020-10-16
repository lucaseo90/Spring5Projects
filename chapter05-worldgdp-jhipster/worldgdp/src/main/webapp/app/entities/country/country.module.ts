import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorldgdpSharedModule } from 'app/shared/shared.module';
import { CountryComponent } from './country.component';
import { CountryDetailComponent } from './country-detail.component';
import { CountryUpdateComponent } from './country-update.component';
import { CountryDeleteDialogComponent } from './country-delete-dialog.component';
import { countryRoute } from './country.route';
import {CountrySearchComponent} from "./country-search.component";

@NgModule({
  imports: [WorldgdpSharedModule, RouterModule.forChild(countryRoute)],
  declarations: [CountryComponent, CountryDetailComponent, CountryUpdateComponent, CountryDeleteDialogComponent, CountrySearchComponent],
  entryComponents: [CountryDeleteDialogComponent],
})
export class WorldgdpCountryModule {}
