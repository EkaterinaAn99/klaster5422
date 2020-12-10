import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Klaster5422TestModule } from '../../../test.module';
import { ProgramsComponent } from 'app/entities/programs/programs.component';
import { ProgramsService } from 'app/entities/programs/programs.service';
import { Programs } from 'app/shared/model/programs.model';

describe('Component Tests', () => {
  describe('Programs Management Component', () => {
    let comp: ProgramsComponent;
    let fixture: ComponentFixture<ProgramsComponent>;
    let service: ProgramsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Klaster5422TestModule],
        declarations: [ProgramsComponent],
      })
        .overrideTemplate(ProgramsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProgramsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProgramsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Programs(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.programs && comp.programs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
