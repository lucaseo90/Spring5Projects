import {Component, OnInit} from "@angular/core";
import {ICountry} from "../../shared/model/country.model";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Data, ParamMap, Router} from "@angular/router";
import {CountryService} from "./country.service";
import {ITEMS_PER_PAGE} from "../../shared/constants/pagination.constants";

@Component({
  selector: 'jhi-country-search',
  templateUrl: './country-search.component.html',
})
export class CountrySearchComponent implements OnInit {
  countries?: ICountry[];
  routeData: any;
  totalItems = 0;
  queryCount: any;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  reverse!: boolean;
  ngbPaginationPage = 1;

  nameFilter!: String;
  continentFilter!: String;

  constructor(
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.countryService
    .query({
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
      'name.contains': this.nameFilter,
      'continent.equals': this.continentFilter
    })
    .subscribe(
      (res: HttpResponse<ICountry[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
      () => this.onError()
    );
  }

  ngOnInit(): void {
    this.continentFilter = '';
    this.nameFilter = '';
    this.loadPage();
  }

  transition(): void {
    this.router.navigate(['/country/country-search'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadPage();
  }

  clear(): void {
    this.page = 0;
    this.router.navigate([
      '/country/country-search',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadPage();
  }

  searchCountries(): void {
    this.clear();
  }


  trackId(index: number, item: ICountry): number | undefined {
    return item.id;
  }

  sort(): string[] {
    const result = [""];
    return result;
  }

  protected onSuccess(data: ICountry[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/country/country-search'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
        },
      });
    }
    this.countries = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
