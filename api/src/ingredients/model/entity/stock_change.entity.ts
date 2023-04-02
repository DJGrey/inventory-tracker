import { RecipeEntity } from 'src/recipes/model/entity/recipe.entity';
import { StaffEntity } from 'src/staff/model/entity/staff.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StockChangeType } from '../enum/stock_change_type.enum';
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

  @Column({ name: 'recipe_id', nullable: true })
  recipeId: number;

  @ManyToOne(() => RecipeEntity)
  @JoinColumn({
    name: 'recipe_id',
  })
  recipe: RecipeEntity;

  @Column({ name: 'staff_member_id' })
  staffMemberId: number;

  @ManyToOne(() => StaffEntity)
  @JoinColumn({
    name: 'staff_member_id',
  })
  staffMember: StaffEntity;

  @Column({ type: 'enum', enum: StockChangeType })
  type: StockChangeType;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Date;
}
