import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Unit } from '../enum/unit.enum';

@Entity()
export class IngredientEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  // Integer as costs are stored in cents.
  @Column('integer')
  cost: number;

  // Updated via trigger when ingredient change is inserted.
  @Column('float', { default: 0 })
  stockCount: number;

  @Column({ type: 'enum', enum: Unit })
  unit: Unit;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Date;
}
