import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../enum/role.enum';

@Entity()
export class StaffEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Date;
}
