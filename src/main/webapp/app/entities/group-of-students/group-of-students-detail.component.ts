import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';

@Component({
  selector: 'jhi-group-of-students-detail',
  templateUrl: './group-of-students-detail.component.html',
})
export class GroupOfStudentsDetailComponent implements OnInit {
  groupOfStudents: IGroupOfStudents | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupOfStudents }) => (this.groupOfStudents = groupOfStudents));
  }

  previousState(): void {
    window.history.back();
  }
}
