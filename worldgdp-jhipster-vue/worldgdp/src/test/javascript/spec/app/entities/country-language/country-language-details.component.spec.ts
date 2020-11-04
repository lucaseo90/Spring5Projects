/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CountryLanguageDetailComponent from '@/entities/country-language/country-language-details.vue';
import CountryLanguageClass from '@/entities/country-language/country-language-details.component';
import CountryLanguageService from '@/entities/country-language/country-language.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('CountryLanguage Management Detail Component', () => {
    let wrapper: Wrapper<CountryLanguageClass>;
    let comp: CountryLanguageClass;
    let countryLanguageServiceStub: SinonStubbedInstance<CountryLanguageService>;

    beforeEach(() => {
      countryLanguageServiceStub = sinon.createStubInstance<CountryLanguageService>(CountryLanguageService);

      wrapper = shallowMount<CountryLanguageClass>(CountryLanguageDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { countryLanguageService: () => countryLanguageServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCountryLanguage = { id: 123 };
        countryLanguageServiceStub.find.resolves(foundCountryLanguage);

        // WHEN
        comp.retrieveCountryLanguage(123);
        await comp.$nextTick();

        // THEN
        expect(comp.countryLanguage).toBe(foundCountryLanguage);
      });
    });
  });
});
