import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Klaster5422SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Klaster5422SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class Klaster5422HomeModule {}
