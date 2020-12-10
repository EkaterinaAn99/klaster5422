import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrograms } from 'app/shared/model/programs.model';
import { ProgramsService } from './programs.service';
import { ProgramsDeleteDialogComponent } from './programs-delete-dialog.component';

@Component({
  selector: 'jhi-programs',
  templateUrl: './programs.component.html',
})
export class ProgramsComponent implements OnInit, OnDestroy {
  programs?: IPrograms[];
  eventSubscriber?: Subscription;

  constructor(protected programsService: ProgramsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.programsService.query().subscribe((res: HttpResponse<IPrograms[]>) => (this.programs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPrograms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPrograms): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPrograms(): void {
    this.eventSubscriber = this.eventManager.subscribe('programsListModification', () => this.loadAll());
  }

  delete(programs: IPrograms): void {
    const modalRef = this.modalService.open(ProgramsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.programs = programs;
  }
}
