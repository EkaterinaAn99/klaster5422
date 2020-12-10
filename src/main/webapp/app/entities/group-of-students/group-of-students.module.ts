import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Klaster5422SharedModule } from 'app/shared/shared.module';
import { GroupOfStudentsComponent } from './group-of-students.component';
import { GroupOfStudentsDetailComponent } from './group-of-students-detail.component';
import { GroupOfStudentsUpdateComponent } from './group-of-students-update.component';
import { GroupOfStudentsDeleteDialogComponent } from './group-of-students-delete-dialog.component';
import { groupOfStudentsRoute } from './group-of-students.route';

@NgModule({
  imports: [Klaster5422SharedModule, RouterModule.forChild(groupOfStudentsRoute)],
  declarations: [
    GroupOfStudentsComponent,
    GroupOfStudentsDetailComponent,
    GroupOfStudentsUpdateComponent,
    GroupOfStudentsDeleteDialogComponent,
  ],
  entryComponents: [GroupOfStudentsDeleteDialogComponent],
})
export class Klaster5422GroupOfStudentsModule {}
