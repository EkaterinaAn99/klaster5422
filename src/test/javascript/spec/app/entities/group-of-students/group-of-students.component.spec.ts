import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Klaster5422TestModule } from '../../../test.module';
import { GroupOfStudentsComponent } from 'app/entities/group-of-students/group-of-students.component';
import { GroupOfStudentsService } from 'app/entities/group-of-students/group-of-students.service';
import { GroupOfStudents } from 'app/shared/model/group-of-students.model';

describe('Component Tests', () => {
  describe('GroupOfStudents Management Component', () => {
    let comp: GroupOfStudentsComponent;
    let fixture: ComponentFixture<GroupOfStudentsComponent>;
    let service: GroupOfStudentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Klaster5422TestModule],
        declarations: [GroupOfStudentsComponent],
      })
        .overrideTemplate(GroupOfStudentsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupOfStudentsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupOfStudentsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GroupOfStudents(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.groupOfStudents && comp.groupOfStudents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
