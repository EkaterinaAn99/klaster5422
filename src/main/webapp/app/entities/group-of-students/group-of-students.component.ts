import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';
import { GroupOfStudentsService } from './group-of-students.service';
import { GroupOfStudentsDeleteDialogComponent } from './group-of-students-delete-dialog.component';

@Component({
  selector: 'jhi-group-of-students',
  templateUrl: './group-of-students.component.html',
})
export class GroupOfStudentsComponent implements OnInit, OnDestroy {
  groupOfStudents?: IGroupOfStudents[];
  eventSubscriber?: Subscription;

  constructor(
    protected groupOfStudentsService: GroupOfStudentsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.groupOfStudentsService.query().subscribe((res: HttpResponse<IGroupOfStudents[]>) => (this.groupOfStudents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGroupOfStudents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGroupOfStudents): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGroupOfStudents(): void {
    this.eventSubscriber = this.eventManager.subscribe('groupOfStudentsListModification', () => this.loadAll());
  }

  delete(groupOfStudents: IGroupOfStudents): void {
    const modalRef = this.modalService.open(GroupOfStudentsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.groupOfStudents = groupOfStudents;
  }
}
