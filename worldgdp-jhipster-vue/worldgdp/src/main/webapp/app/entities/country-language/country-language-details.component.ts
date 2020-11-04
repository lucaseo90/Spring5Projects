import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICountryLanguage } from '@/shared/model/country-language.model';
import CountryLanguageService from './country-language.service';

@Component
export default class CountryLanguageDetails extends Vue {
  @Inject('countryLanguageService') private countryLanguageService: () => CountryLanguageService;
  public countryLanguage: ICountryLanguage = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.countryLanguageId) {
        vm.retrieveCountryLanguage(to.params.countryLanguageId);
      }
    });
  }

  public retrieveCountryLanguage(countryLanguageId) {
    this.countryLanguageService()
      .find(countryLanguageId)
      .then(res => {
        this.countryLanguage = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
