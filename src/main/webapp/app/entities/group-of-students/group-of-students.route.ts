import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGroupOfStudents, GroupOfStudents } from 'app/shared/model/group-of-students.model';
import { GroupOfStudentsService } from './group-of-students.service';
import { GroupOfStudentsComponent } from './group-of-students.component';
import { GroupOfStudentsDetailComponent } from './group-of-students-detail.component';
import { GroupOfStudentsUpdateComponent } from './group-of-students-update.component';

@Injectable({ providedIn: 'root' })
export class GroupOfStudentsResolve implements Resolve<IGroupOfStudents> {
  constructor(private service: GroupOfStudentsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroupOfStudents> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((groupOfStudents: HttpResponse<GroupOfStudents>) => {
          if (groupOfStudents.body) {
            return of(groupOfStudents.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GroupOfStudents());
  }
}

export const groupOfStudentsRoute: Routes = [
  {
    path: '',
    component: GroupOfStudentsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.groupOfStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GroupOfStudentsDetailComponent,
    resolve: {
      groupOfStudents: GroupOfStudentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.groupOfStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GroupOfStudentsUpdateComponent,
    resolve: {
      groupOfStudents: GroupOfStudentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.groupOfStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GroupOfStudentsUpdateComponent,
    resolve: {
      groupOfStudents: GroupOfStudentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.groupOfStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
