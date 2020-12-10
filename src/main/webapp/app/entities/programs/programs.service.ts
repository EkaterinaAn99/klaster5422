import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrograms } from 'app/shared/model/programs.model';

type EntityResponseType = HttpResponse<IPrograms>;
type EntityArrayResponseType = HttpResponse<IPrograms[]>;

@Injectable({ providedIn: 'root' })
export class ProgramsService {
  public resourceUrl = SERVER_API_URL + 'api/programs';

  constructor(protected http: HttpClient) {}

  create(programs: IPrograms): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programs);
    return this.http
      .post<IPrograms>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(programs: IPrograms): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programs);
    return this.http
      .put<IPrograms>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPrograms>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrograms[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(programs: IPrograms): IPrograms {
    const copy: IPrograms = Object.assign({}, programs, {
      date: programs.date && programs.date.isValid() ? programs.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((programs: IPrograms) => {
        programs.date = programs.date ? moment(programs.date) : undefined;
      });
    }
    return res;
  }
}
