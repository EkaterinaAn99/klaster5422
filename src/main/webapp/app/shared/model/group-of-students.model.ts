import { IPrograms } from 'app/shared/model/programs.model';
import { IStudents } from 'app/shared/model/students.model';
import { ITeachers } from 'app/shared/model/teachers.model';

export interface IGroupOfStudents {
  id?: number;
  nameOfStudents?: string;
  programs?: IPrograms[];
  students?: IStudents[];
  teachers?: ITeachers;
}

export class GroupOfStudents implements IGroupOfStudents {
  constructor(
    public id?: number,
    public nameOfStudents?: string,
    public programs?: IPrograms[],
    public students?: IStudents[],
    public teachers?: ITeachers
  ) {}
}
