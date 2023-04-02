import { IngredientEntity } from 'src/ingredients/model/entity/ingredient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecipeEntity } from './recipe.entity';

@Entity()
export class RecipeIngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  ingredientQuantity: number;

  @Column({ name: 'recipe_id' })
  recipeId: number;

  @ManyToOne(() => RecipeEntity)
  @JoinColumn({
    name: 'recipe_id',
  })
  recipe: RecipeEntity;

  @Column({ name: 'ingredient_id' })
  ingredientId: number;

  @ManyToOne(() => IngredientEntity)
  @JoinColumn({
    name: 'ingredient_id',
  })
  ingredient: IngredientEntity;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Date;
}
