import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStudents, Students } from 'app/shared/model/students.model';
import { StudentsService } from './students.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITeachers } from 'app/shared/model/teachers.model';
import { TeachersService } from 'app/entities/teachers/teachers.service';
import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';
import { GroupOfStudentsService } from 'app/entities/group-of-students/group-of-students.service';

type SelectableEntity = IUser | ITeachers | IGroupOfStudents;

@Component({
  selector: 'jhi-students-update',
  templateUrl: './students-update.component.html',
})
export class StudentsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  teachers: ITeachers[] = [];
  groupofstudents: IGroupOfStudents[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    surname: [],
    middleName: [],
    group: [],
    type: [],
    user: [],
    teachers: [],
    groupOfStudents: [],
  });

  constructor(
    protected studentsService: StudentsService,
    protected userService: UserService,
    protected teachersService: TeachersService,
    protected groupOfStudentsService: GroupOfStudentsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ students }) => {
      this.updateForm(students);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.teachersService.query().subscribe((res: HttpResponse<ITeachers[]>) => (this.teachers = res.body || []));

      this.groupOfStudentsService.query().subscribe((res: HttpResponse<IGroupOfStudents[]>) => (this.groupofstudents = res.body || []));
    });
  }

  updateForm(students: IStudents): void {
    this.editForm.patchValue({
      id: students.id,
      name: students.name,
      surname: students.surname,
      middleName: students.middleName,
      group: students.group,
      type: students.type,
      user: students.user,
      teachers: students.teachers,
      groupOfStudents: students.groupOfStudents,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const students = this.createFromForm();
    if (students.id !== undefined) {
      this.subscribeToSaveResponse(this.studentsService.update(students));
    } else {
      this.subscribeToSaveResponse(this.studentsService.create(students));
    }
  }

  private createFromForm(): IStudents {
    return {
      ...new Students(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      middleName: this.editForm.get(['middleName'])!.value,
      group: this.editForm.get(['group'])!.value,
      type: this.editForm.get(['type'])!.value,
      user: this.editForm.get(['user'])!.value,
      teachers: this.editForm.get(['teachers'])!.value,
      groupOfStudents: this.editForm.get(['groupOfStudents'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudents>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
