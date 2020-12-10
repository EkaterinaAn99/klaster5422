import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrograms } from 'app/shared/model/programs.model';
import { ProgramsService } from './programs.service';

@Component({
  templateUrl: './programs-delete-dialog.component.html',
})
export class ProgramsDeleteDialogComponent {
  programs?: IPrograms;

  constructor(protected programsService: ProgramsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('programsListModification');
      this.activeModal.close();
    });
  }
}
