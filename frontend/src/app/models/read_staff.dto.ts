import { Role } from "../enums/role.enum";

export interface ReadStaffDto {
  id: number;
  name: string;
  role: Role;
}

export interface ReadAllStaffDto {
  staff: ReadStaffDto[];
}
