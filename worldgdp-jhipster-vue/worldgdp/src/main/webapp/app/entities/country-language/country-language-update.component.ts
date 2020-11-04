import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CountryService from '../country/country.service';
import { ICountry } from '@/shared/model/country.model';

import AlertService from '@/shared/alert/alert.service';
import { ICountryLanguage, CountryLanguage } from '@/shared/model/country-language.model';
import CountryLanguageService from './country-language.service';

const validations: any = {
  countryLanguage: {
    language: {
      required,
    },
    isOfficial: {
      required,
    },
    percentage: {
      required,
      numeric,
    },
    countryId: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class CountryLanguageUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('countryLanguageService') private countryLanguageService: () => CountryLanguageService;
  public countryLanguage: ICountryLanguage = new CountryLanguage();

  @Inject('countryService') private countryService: () => CountryService;

  public countries: ICountry[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.countryLanguageId) {
        vm.retrieveCountryLanguage(to.params.countryLanguageId);
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
    if (this.countryLanguage.id) {
      this.countryLanguageService()
        .update(this.countryLanguage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('worldgdpApp.countryLanguage.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.countryLanguageService()
        .create(this.countryLanguage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('worldgdpApp.countryLanguage.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCountryLanguage(countryLanguageId): void {
    this.countryLanguageService()
      .find(countryLanguageId)
      .then(res => {
        this.countryLanguage = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.countryService()
      .retrieve()
      .then(res => {
        this.countries = res.data;
      });
  }
}
