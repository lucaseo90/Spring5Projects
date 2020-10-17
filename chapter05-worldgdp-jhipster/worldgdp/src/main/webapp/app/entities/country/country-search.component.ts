import {Component, OnDestroy, OnInit} from "@angular/core";
import {ICountry} from "../../shared/model/country.model";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CountryService} from "./country.service";
import {ITEMS_PER_PAGE} from "../../shared/constants/pagination.constants";

@Component({
  selector: 'jhi-country-search',
  templateUrl: './country-search.component.html',
})
export class CountrySearchComponent implements OnInit {
  countries: ICountry[] | null | undefined;
  routeData: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  nameFilter: String | undefined;
  continentFilter: String | undefined;

  constructor(
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.countryService
    .search({
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
      'name.contains': this.nameFilter,
      'continent.equals': this.continentFilter
    })
    .subscribe(
      (res: HttpResponse<ICountry[]>) => this.paginateCountries(res.body, res.headers),
    );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/countries'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/countries',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.continentFilter = '';
    this.nameFilter = '';
    this.loadAll();
  }

  searchCountries() {
    this.clear();
  }

  trackId(index: number, item: ICountry) {
    return item.id;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }

  private paginateCountries(data: ICountry[] | null, headers: HttpHeaders) {
    this.totalItems = parseInt(headers.get('X-Total-Count') as string, 10);
    this.queryCount = this.totalItems;
    this.countries = data;
  }
}
