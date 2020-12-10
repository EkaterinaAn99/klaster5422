import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Klaster5422TestModule } from '../../../test.module';
import { GroupOfStudentsDetailComponent } from 'app/entities/group-of-students/group-of-students-detail.component';
import { GroupOfStudents } from 'app/shared/model/group-of-students.model';

describe('Component Tests', () => {
  describe('GroupOfStudents Management Detail Component', () => {
    let comp: GroupOfStudentsDetailComponent;
    let fixture: ComponentFixture<GroupOfStudentsDetailComponent>;
    const route = ({ data: of({ groupOfStudents: new GroupOfStudents(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Klaster5422TestModule],
        declarations: [GroupOfStudentsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GroupOfStudentsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupOfStudentsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load groupOfStudents on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupOfStudents).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
