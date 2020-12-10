import { Moment } from 'moment';
import { IStudents } from 'app/shared/model/students.model';
import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';
import { ITeachers } from 'app/shared/model/teachers.model';

export interface IPrograms {
  id?: number;
  date?: Moment;
  whoAdd?: string;
  group?: string;
  adress?: string;
  students?: IStudents;
  groupOfStudents?: IGroupOfStudents;
  teachers?: ITeachers;
}

export class Programs implements IPrograms {
  constructor(
    public id?: number,
    public date?: Moment,
    public whoAdd?: string,
    public group?: string,
    public adress?: string,
    public students?: IStudents,
    public groupOfStudents?: IGroupOfStudents,
    public teachers?: ITeachers
  ) {}
}
