import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';

type EntityResponseType = HttpResponse<IGroupOfStudents>;
type EntityArrayResponseType = HttpResponse<IGroupOfStudents[]>;

@Injectable({ providedIn: 'root' })
export class GroupOfStudentsService {
  public resourceUrl = SERVER_API_URL + 'api/group-of-students';

  constructor(protected http: HttpClient) {}

  create(groupOfStudents: IGroupOfStudents): Observable<EntityResponseType> {
    return this.http.post<IGroupOfStudents>(this.resourceUrl, groupOfStudents, { observe: 'response' });
  }

  update(groupOfStudents: IGroupOfStudents): Observable<EntityResponseType> {
    return this.http.put<IGroupOfStudents>(this.resourceUrl, groupOfStudents, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupOfStudents>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupOfStudents[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
