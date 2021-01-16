import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IGdpData} from "../../shared/model/chart.gdp.model";
import {ICountry} from "../../shared/model/country.model";
// @ts-ignore
import {Chart} from 'chart.js';

@Component({
  selector: 'jhi-country-show-gdp',
  templateUrl: './country-show-gdp.component.html',
})
export class CountryShowGdpComponent implements OnInit {

  currentCountry?: ICountry;
  data?: IGdpData[];
  preGDPUrl = 'http://api.worldbank.org/v2/countries/';
  postGDPUrl = '/indicators/NY.GDP.MKTP.CD?format=json&per_page=' + 10;
  year = [];
  gdp = [];
  chart = [];
  noDataAvailale: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.currentCountry = data.country;
    });
  }

  ngOnInit(): void {
    if (this.currentCountry != undefined) {
      const gdpUrl = this.preGDPUrl + this.currentCountry.code + this.postGDPUrl;
      this.httpClient.get(gdpUrl).subscribe(res => {
        this.noDataAvailale = true;
        const gdpDataArr = res[1];
        if (gdpDataArr) {
          this.noDataAvailale = false;
          gdpDataArr.forEach((y: { date: any; value: any; }) => {
            // @ts-ignore
            this.year.push(y.date);
            // @ts-ignore
            this.gdp.push(y.value);
          });
          this.year = this.year.reverse();
          this.gdp = this.gdp.reverse();

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: this.year,
              datasets: [
                {
                  data: this.gdp,
                  borderColor: '#3cba9f',
                  fill: true
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
          });
        }
      });
    }
  }
}
