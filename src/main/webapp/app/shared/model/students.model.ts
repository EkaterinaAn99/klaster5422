import { IUser } from 'app/core/user/user.model';
import { IPrograms } from 'app/shared/model/programs.model';
import { ITeachers } from 'app/shared/model/teachers.model';
import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';

export interface IStudents {
  id?: number;
  name?: string;
  surname?: string;
  middleName?: string;
  group?: string;
  type?: string;
  user?: IUser;
  progams?: IPrograms[];
  teachers?: ITeachers;
  groupOfStudents?: IGroupOfStudents;
}

export class Students implements IStudents {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public middleName?: string,
    public group?: string,
    public type?: string,
    public user?: IUser,
    public progams?: IPrograms[],
    public teachers?: ITeachers,
    public groupOfStudents?: IGroupOfStudents
  ) {}
}
