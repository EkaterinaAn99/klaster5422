import { IUser } from 'app/core/user/user.model';
import { IPrograms } from 'app/shared/model/programs.model';
import { IStudents } from 'app/shared/model/students.model';
import { IGroupOfStudents } from 'app/shared/model/group-of-students.model';

export interface ITeachers {
  id?: number;
  name?: string;
  surname?: string;
  middleName?: string;
  type?: string;
  user?: IUser;
  programs?: IPrograms[];
  students?: IStudents[];
  groupofstudents?: IGroupOfStudents[];
}

export class Teachers implements ITeachers {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public middleName?: string,
    public type?: string,
    public user?: IUser,
    public programs?: IPrograms[],
    public students?: IStudents[],
    public groupofstudents?: IGroupOfStudents[]
  ) {}
}
