import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Klaster5422TestModule } from '../../../test.module';
import { GroupOfStudentsUpdateComponent } from 'app/entities/group-of-students/group-of-students-update.component';
import { GroupOfStudentsService } from 'app/entities/group-of-students/group-of-students.service';
import { GroupOfStudents } from 'app/shared/model/group-of-students.model';

describe('Component Tests', () => {
  describe('GroupOfStudents Management Update Component', () => {
    let comp: GroupOfStudentsUpdateComponent;
    let fixture: ComponentFixture<GroupOfStudentsUpdateComponent>;
    let service: GroupOfStudentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Klaster5422TestModule],
        declarations: [GroupOfStudentsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GroupOfStudentsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupOfStudentsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupOfStudentsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupOfStudents(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupOfStudents();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
