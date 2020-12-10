import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Klaster5422SharedModule } from 'app/shared/shared.module';
import { StudentsComponent } from './students.component';
import { StudentsDetailComponent } from './students-detail.component';
import { StudentsUpdateComponent } from './students-update.component';
import { StudentsDeleteDialogComponent } from './students-delete-dialog.component';
import { studentsRoute } from './students.route';

@NgModule({
  imports: [Klaster5422SharedModule, RouterModule.forChild(studentsRoute)],
  declarations: [StudentsComponent, StudentsDetailComponent, StudentsUpdateComponent, StudentsDeleteDialogComponent],
  entryComponents: [StudentsDeleteDialogComponent],
})
export class Klaster5422StudentsModule {}
