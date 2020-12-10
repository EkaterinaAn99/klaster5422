import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then(m => m.Klaster5422StudentsModule),
      },
      {
        path: 'group-of-students',
        loadChildren: () => import('./group-of-students/group-of-students.module').then(m => m.Klaster5422GroupOfStudentsModule),
      },
      {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then(m => m.Klaster5422TeachersModule),
      },
      {
        path: 'programs',
        loadChildren: () => import('./programs/programs.module').then(m => m.Klaster5422ProgramsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class Klaster5422EntityModule {}
