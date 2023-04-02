import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enum/role.enum';

@Entity()
export class StaffEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}
