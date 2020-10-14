import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorldgdpSharedModule } from 'app/shared/shared.module';
import { CountryLanguageComponent } from './country-language.component';
import { CountryLanguageDetailComponent } from './country-language-detail.component';
import { CountryLanguageUpdateComponent } from './country-language-update.component';
import { CountryLanguageDeleteDialogComponent } from './country-language-delete-dialog.component';
import { countryLanguageRoute } from './country-language.route';

@NgModule({
  imports: [WorldgdpSharedModule, RouterModule.forChild(countryLanguageRoute)],
  declarations: [
    CountryLanguageComponent,
    CountryLanguageDetailComponent,
    CountryLanguageUpdateComponent,
    CountryLanguageDeleteDialogComponent,
  ],
  entryComponents: [CountryLanguageDeleteDialogComponent],
})
export class WorldgdpCountryLanguageModule {}
