import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';
import { GroupOfStudentsService } from './group-of-students.service';

@Component({
  templateUrl: './group-of-students-delete-dialog.component.html',
})
export class GroupOfStudentsDeleteDialogComponent {
  groupOfStudents?: IGroupOfStudents;

  constructor(
    protected groupOfStudentsService: GroupOfStudentsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.groupOfStudentsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('groupOfStudentsListModification');
      this.activeModal.close();
    });
  }
}
