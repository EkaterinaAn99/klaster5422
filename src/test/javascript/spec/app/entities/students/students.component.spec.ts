import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Klaster5422TestModule } from '../../../test.module';
import { StudentsComponent } from 'app/entities/students/students.component';
import { StudentsService } from 'app/entities/students/students.service';
import { Students } from 'app/shared/model/students.model';

describe('Component Tests', () => {
  describe('Students Management Component', () => {
    let comp: StudentsComponent;
    let fixture: ComponentFixture<StudentsComponent>;
    let service: StudentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Klaster5422TestModule],
        declarations: [StudentsComponent],
      })
        .overrideTemplate(StudentsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudentsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudentsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Students(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.students && comp.students[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
