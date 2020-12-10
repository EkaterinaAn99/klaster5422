import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Klaster5422TestModule } from '../../../test.module';
import { ProgramsDetailComponent } from 'app/entities/programs/programs-detail.component';
import { Programs } from 'app/shared/model/programs.model';

describe('Component Tests', () => {
  describe('Programs Management Detail Component', () => {
    let comp: ProgramsDetailComponent;
    let fixture: ComponentFixture<ProgramsDetailComponent>;
    const route = ({ data: of({ programs: new Programs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Klaster5422TestModule],
        declarations: [ProgramsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProgramsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProgramsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load programs on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.programs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
