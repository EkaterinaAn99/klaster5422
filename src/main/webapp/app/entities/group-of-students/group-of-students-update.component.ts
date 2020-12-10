import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGroupOfStudents, GroupOfStudents } from 'app/shared/model/group-of-students.model';
import { GroupOfStudentsService } from './group-of-students.service';
import { ITeachers } from 'app/shared/model/teachers.model';
import { TeachersService } from 'app/entities/teachers/teachers.service';

@Component({
  selector: 'jhi-group-of-students-update',
  templateUrl: './group-of-students-update.component.html',
})
export class GroupOfStudentsUpdateComponent implements OnInit {
  isSaving = false;
  teachers: ITeachers[] = [];

  editForm = this.fb.group({
    id: [],
    nameOfStudents: [],
    teachers: [],
  });

  constructor(
    protected groupOfStudentsService: GroupOfStudentsService,
    protected teachersService: TeachersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupOfStudents }) => {
      this.updateForm(groupOfStudents);

      this.teachersService.query().subscribe((res: HttpResponse<ITeachers[]>) => (this.teachers = res.body || []));
    });
  }

  updateForm(groupOfStudents: IGroupOfStudents): void {
    this.editForm.patchValue({
      id: groupOfStudents.id,
      nameOfStudents: groupOfStudents.nameOfStudents,
      teachers: groupOfStudents.teachers,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groupOfStudents = this.createFromForm();
    if (groupOfStudents.id !== undefined) {
      this.subscribeToSaveResponse(this.groupOfStudentsService.update(groupOfStudents));
    } else {
      this.subscribeToSaveResponse(this.groupOfStudentsService.create(groupOfStudents));
    }
  }

  private createFromForm(): IGroupOfStudents {
    return {
      ...new GroupOfStudents(),
      id: this.editForm.get(['id'])!.value,
      nameOfStudents: this.editForm.get(['nameOfStudents'])!.value,
      teachers: this.editForm.get(['teachers'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupOfStudents>>): void {
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

  trackById(index: number, item: ITeachers): any {
    return item.id;
  }
}
