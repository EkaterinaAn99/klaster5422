import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITeachers, Teachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-teachers-update',
  templateUrl: './teachers-update.component.html',
})
export class TeachersUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    surname: [],
    middleName: [],
    type: [],
    user: [],
  });

  constructor(
    protected teachersService: TeachersService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teachers }) => {
      this.updateForm(teachers);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(teachers: ITeachers): void {
    this.editForm.patchValue({
      id: teachers.id,
      name: teachers.name,
      surname: teachers.surname,
      middleName: teachers.middleName,
      type: teachers.type,
      user: teachers.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teachers = this.createFromForm();
    if (teachers.id !== undefined) {
      this.subscribeToSaveResponse(this.teachersService.update(teachers));
    } else {
      this.subscribeToSaveResponse(this.teachersService.create(teachers));
    }
  }

  private createFromForm(): ITeachers {
    return {
      ...new Teachers(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      middleName: this.editForm.get(['middleName'])!.value,
      type: this.editForm.get(['type'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeachers>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
