import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICountry, Country } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { CountryComponent } from './country.component';
import { CountryDetailComponent } from './country-detail.component';
import { CountryUpdateComponent } from './country-update.component';
import {CountrySearchComponent} from "./country-search.component";
import {CountryShowGdpComponent} from "./country-show-gdp.component";

@Injectable({ providedIn: 'root' })
export class CountryResolve implements Resolve<ICountry> {
  constructor(private service: CountryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountry> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((country: HttpResponse<Country>) => {
          if (country.body) {
            return of(country.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Country());
  }
}

export const countryRoute: Routes = [
  {
    path: '',
    component: CountryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'worldgdpApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CountryDetailComponent,
    resolve: {
      country: CountryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'worldgdpApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountryUpdateComponent,
    resolve: {
      country: CountryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'worldgdpApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CountryUpdateComponent,
    resolve: {
      country: CountryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'worldgdpApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'country-search',
    component: CountrySearchComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'worldgdpApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/gdp',
    component: CountryShowGdpComponent,
    resolve: {
      country: CountryResolve,
    },
    canActivate: [UserRouteAccessService],
  }
];
