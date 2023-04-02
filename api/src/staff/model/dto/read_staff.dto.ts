import { Role } from '../enum/role.enum';

export class ReadStaffDto {
  id: number;
  name: string;
  role: Role;
}

export class ReadAllStaffDto {
  staff: ReadStaffDto[];
}
