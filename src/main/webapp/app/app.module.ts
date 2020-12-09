import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Klaster5422SharedModule } from 'app/shared/shared.module';
import { Klaster5422CoreModule } from 'app/core/core.module';
import { Klaster5422AppRoutingModule } from './app-routing.module';
import { Klaster5422HomeModule } from './home/home.module';
import { Klaster5422EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Klaster5422SharedModule,
    Klaster5422CoreModule,
    Klaster5422HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Klaster5422EntityModule,
    Klaster5422AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class Klaster5422AppModule {}
