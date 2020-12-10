import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrograms } from 'app/shared/model/programs.model';

@Component({
  selector: 'jhi-programs-detail',
  templateUrl: './programs-detail.component.html',
})
export class ProgramsDetailComponent implements OnInit {
  programs: IPrograms | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programs }) => (this.programs = programs));
  }

  previousState(): void {
    window.history.back();
  }
}
