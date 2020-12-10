import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Klaster5422TestModule } from '../../../test.module';
import { ProgramsUpdateComponent } from 'app/entities/programs/programs-update.component';
import { ProgramsService } from 'app/entities/programs/programs.service';
import { Programs } from 'app/shared/model/programs.model';

describe('Component Tests', () => {
  describe('Programs Management Update Component', () => {
    let comp: ProgramsUpdateComponent;
    let fixture: ComponentFixture<ProgramsUpdateComponent>;
    let service: ProgramsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Klaster5422TestModule],
        declarations: [ProgramsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProgramsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProgramsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProgramsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Programs(123);
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
        const entity = new Programs();
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
