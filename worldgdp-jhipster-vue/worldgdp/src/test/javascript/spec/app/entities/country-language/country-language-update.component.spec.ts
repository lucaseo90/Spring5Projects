/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import CountryLanguageUpdateComponent from '@/entities/country-language/country-language-update.vue';
import CountryLanguageClass from '@/entities/country-language/country-language-update.component';
import CountryLanguageService from '@/entities/country-language/country-language.service';

import CountryService from '@/entities/country/country.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('CountryLanguage Management Update Component', () => {
    let wrapper: Wrapper<CountryLanguageClass>;
    let comp: CountryLanguageClass;
    let countryLanguageServiceStub: SinonStubbedInstance<CountryLanguageService>;

    beforeEach(() => {
      countryLanguageServiceStub = sinon.createStubInstance<CountryLanguageService>(CountryLanguageService);

      wrapper = shallowMount<CountryLanguageClass>(CountryLanguageUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          countryLanguageService: () => countryLanguageServiceStub,

          countryService: () => new CountryService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.countryLanguage = entity;
        countryLanguageServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(countryLanguageServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.countryLanguage = entity;
        countryLanguageServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(countryLanguageServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
