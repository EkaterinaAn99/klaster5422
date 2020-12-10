import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPrograms, Programs } from 'app/shared/model/programs.model';
import { ProgramsService } from './programs.service';
import { IStudents } from 'app/shared/model/students.model';
import { StudentsService } from 'app/entities/students/students.service';
import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';
import { GroupOfStudentsService } from 'app/entities/group-of-students/group-of-students.service';
import { ITeachers } from 'app/shared/model/teachers.model';
import { TeachersService } from 'app/entities/teachers/teachers.service';

type SelectableEntity = IStudents | IGroupOfStudents | ITeachers;

@Component({
  selector: 'jhi-programs-update',
  templateUrl: './programs-update.component.html',
})
export class ProgramsUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudents[] = [];
  groupofstudents: IGroupOfStudents[] = [];
  teachers: ITeachers[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    whoAdd: [],
    group: [],
    adress: [],
    students: [],
    groupOfStudents: [],
    teachers: [],
  });

  constructor(
    protected programsService: ProgramsService,
    protected studentsService: StudentsService,
    protected groupOfStudentsService: GroupOfStudentsService,
    protected teachersService: TeachersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programs }) => {
      if (!programs.id) {
        const today = moment().startOf('day');
        programs.date = today;
      }

      this.updateForm(programs);

      this.studentsService.query().subscribe((res: HttpResponse<IStudents[]>) => (this.students = res.body || []));

      this.groupOfStudentsService.query().subscribe((res: HttpResponse<IGroupOfStudents[]>) => (this.groupofstudents = res.body || []));

      this.teachersService.query().subscribe((res: HttpResponse<ITeachers[]>) => (this.teachers = res.body || []));
    });
  }

  updateForm(programs: IPrograms): void {
    this.editForm.patchValue({
      id: programs.id,
      date: programs.date ? programs.date.format(DATE_TIME_FORMAT) : null,
      whoAdd: programs.whoAdd,
      group: programs.group,
      adress: programs.adress,
      students: programs.students,
      groupOfStudents: programs.groupOfStudents,
      teachers: programs.teachers,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const programs = this.createFromForm();
    if (programs.id !== undefined) {
      this.subscribeToSaveResponse(this.programsService.update(programs));
    } else {
      this.subscribeToSaveResponse(this.programsService.create(programs));
    }
  }

  private createFromForm(): IPrograms {
    return {
      ...new Programs(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      whoAdd: this.editForm.get(['whoAdd'])!.value,
      group: this.editForm.get(['group'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      students: this.editForm.get(['students'])!.value,
      groupOfStudents: this.editForm.get(['groupOfStudents'])!.value,
      teachers: this.editForm.get(['teachers'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrograms>>): void {
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
