import { StaffEntity } from 'src/staff/model/entity/staff.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from '../enum/unit.enum';
import { IngredientEntity } from './ingredient.entity';

@Entity()
export class StockChangeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  stockQuantityChange: number;

  @Column({ name: 'ingredient_id' })
  ingredientId: number;

  @ManyToOne(() => IngredientEntity)
  @JoinColumn({
    name: 'ingredient_id',
  })
  ingredient: IngredientEntity;

  @Column({ name: 'staff_member_id' })
  staffMemberId: number;

  @ManyToOne(() => StaffEntity)
  @JoinColumn({
    name: 'staff_member_id',
  })
  staffMember: StaffEntity;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Date;
}
