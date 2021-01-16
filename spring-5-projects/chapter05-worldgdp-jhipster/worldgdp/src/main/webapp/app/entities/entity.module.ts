import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'owner',
        loadChildren: () => import('./owner/owner.module').then(m => m.WorldgdpOwnerModule),
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.WorldgdpCountryModule),
      },
      {
        path: 'city',
        loadChildren: () => import('./city/city.module').then(m => m.WorldgdpCityModule),
      },
      {
        path: 'country-language',
        loadChildren: () => import('./country-language/country-language.module').then(m => m.WorldgdpCountryLanguageModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class WorldgdpEntityModule {}
