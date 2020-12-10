import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrograms, Programs } from 'app/shared/model/programs.model';
import { ProgramsService } from './programs.service';
import { ProgramsComponent } from './programs.component';
import { ProgramsDetailComponent } from './programs-detail.component';
import { ProgramsUpdateComponent } from './programs-update.component';

@Injectable({ providedIn: 'root' })
export class ProgramsResolve implements Resolve<IPrograms> {
  constructor(private service: ProgramsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrograms> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((programs: HttpResponse<Programs>) => {
          if (programs.body) {
            return of(programs.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Programs());
  }
}

export const programsRoute: Routes = [
  {
    path: '',
    component: ProgramsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.programs.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgramsDetailComponent,
    resolve: {
      programs: ProgramsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.programs.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgramsUpdateComponent,
    resolve: {
      programs: ProgramsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.programs.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgramsUpdateComponent,
    resolve: {
      programs: ProgramsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'klaster5422App.programs.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
