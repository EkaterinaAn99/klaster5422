import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Klaster5422SharedModule } from 'app/shared/shared.module';
import { ProgramsComponent } from './programs.component';
import { ProgramsDetailComponent } from './programs-detail.component';
import { ProgramsUpdateComponent } from './programs-update.component';
import { ProgramsDeleteDialogComponent } from './programs-delete-dialog.component';
import { programsRoute } from './programs.route';

@NgModule({
  imports: [Klaster5422SharedModule, RouterModule.forChild(programsRoute)],
  declarations: [ProgramsComponent, ProgramsDetailComponent, ProgramsUpdateComponent, ProgramsDeleteDialogComponent],
  entryComponents: [ProgramsDeleteDialogComponent],
})
export class Klaster5422ProgramsModule {}
