import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Country = () => import('@/entities/country/country.vue');
// prettier-ignore
const CountryUpdate = () => import('@/entities/country/country-update.vue');
// prettier-ignore
const CountryDetails = () => import('@/entities/country/country-details.vue');
// prettier-ignore
const City = () => import('@/entities/city/city.vue');
// prettier-ignore
const CityUpdate = () => import('@/entities/city/city-update.vue');
// prettier-ignore
const CityDetails = () => import('@/entities/city/city-details.vue');
// prettier-ignore
const CountryLanguage = () => import('@/entities/country-language/country-language.vue');
// prettier-ignore
const CountryLanguageUpdate = () => import('@/entities/country-language/country-language-update.vue');
// prettier-ignore
const CountryLanguageDetails = () => import('@/entities/country-language/country-language-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/country',
    name: 'Country',
    component: Country,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country/new',
    name: 'CountryCreate',
    component: CountryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country/:countryId/edit',
    name: 'CountryEdit',
    component: CountryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country/:countryId/view',
    name: 'CountryView',
    component: CountryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/city',
    name: 'City',
    component: City,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/city/new',
    name: 'CityCreate',
    component: CityUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/city/:cityId/edit',
    name: 'CityEdit',
    component: CityUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/city/:cityId/view',
    name: 'CityView',
    component: CityDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-language',
    name: 'CountryLanguage',
    component: CountryLanguage,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-language/new',
    name: 'CountryLanguageCreate',
    component: CountryLanguageUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-language/:countryLanguageId/edit',
    name: 'CountryLanguageEdit',
    component: CountryLanguageUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-language/:countryLanguageId/view',
    name: 'CountryLanguageView',
    component: CountryLanguageDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
