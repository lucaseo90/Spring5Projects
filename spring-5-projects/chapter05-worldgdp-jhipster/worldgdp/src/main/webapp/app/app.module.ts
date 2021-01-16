import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { WorldgdpSharedModule } from 'app/shared/shared.module';
import { WorldgdpCoreModule } from 'app/core/core.module';
import { WorldgdpAppRoutingModule } from './app-routing.module';
import { WorldgdpHomeModule } from './home/home.module';
import { WorldgdpEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import {WolrdgdpSearchCountriesModule} from "./search-countries/search-countries.module";

@NgModule({
  imports: [
    BrowserModule,
    WorldgdpSharedModule,
    WorldgdpCoreModule,
    WorldgdpHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    WorldgdpEntityModule,
    WorldgdpAppRoutingModule,
    WolrdgdpSearchCountriesModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class WorldgdpAppModule {}
