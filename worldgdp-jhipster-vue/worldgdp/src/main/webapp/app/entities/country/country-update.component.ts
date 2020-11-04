import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CityService from '../city/city.service';
import { ICity } from '@/shared/model/city.model';

import CountryLanguageService from '../country-language/country-language.service';
import { ICountryLanguage } from '@/shared/model/country-language.model';

import AlertService from '@/shared/alert/alert.service';
import { ICountry, Country } from '@/shared/model/country.model';
import CountryService from './country.service';

const validations: any = {
  country: {
    code: {
      required,
      maxLength: maxLength(3),
    },
    name: {
      required,
      maxLength: maxLength(52),
    },
    continent: {
      required,
    },
    region: {
      required,
      maxLength: maxLength(26),
    },
    surfaceArea: {
      required,
      numeric,
    },
    population: {
      required,
      numeric,
    },
    lifeExpectancy: {},
    localName: {
      required,
      maxLength: maxLength(45),
    },
    governmentForm: {
      required,
      maxLength: maxLength(45),
    },
  },
};

@Component({
  validations,
})
export default class CountryUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('countryService') private countryService: () => CountryService;
  public country: ICountry = new Country();

  @Inject('cityService') private cityService: () => CityService;

  public cities: ICity[] = [];

  @Inject('countryLanguageService') private countryLanguageService: () => CountryLanguageService;

  public countryLanguages: ICountryLanguage[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.countryId) {
        vm.retrieveCountry(to.params.countryId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.country.id) {
      this.countryService()
        .update(this.country)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('worldgdpApp.country.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.countryService()
        .create(this.country)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('worldgdpApp.country.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCountry(countryId): void {
    this.countryService()
      .find(countryId)
      .then(res => {
        this.country = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cityService()
      .retrieve()
      .then(res => {
        this.cities = res.data;
      });
    this.countryLanguageService()
      .retrieve()
      .then(res => {
        this.countryLanguages = res.data;
      });
  }
}
