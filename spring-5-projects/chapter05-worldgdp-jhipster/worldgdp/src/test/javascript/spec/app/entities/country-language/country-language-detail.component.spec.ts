import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorldgdpTestModule } from '../../../test.module';
import { CountryLanguageDetailComponent } from 'app/entities/country-language/country-language-detail.component';
import { CountryLanguage } from 'app/shared/model/country-language.model';

describe('Component Tests', () => {
  describe('CountryLanguage Management Detail Component', () => {
    let comp: CountryLanguageDetailComponent;
    let fixture: ComponentFixture<CountryLanguageDetailComponent>;
    const route = ({ data: of({ countryLanguage: new CountryLanguage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WorldgdpTestModule],
        declarations: [CountryLanguageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CountryLanguageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryLanguageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load countryLanguage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.countryLanguage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
