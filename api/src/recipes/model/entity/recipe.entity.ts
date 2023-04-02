import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RecipeIngredientEntity } from './recipe_ingredient.entity';

@Entity()
export class RecipeEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  // Integer as price are stored in cents.
  @Column('integer')
  price: number;

  @OneToMany(
    () => RecipeIngredientEntity,
    (recipeIngredient) => recipeIngredient.recipe,
  )
  recipeIngredients: RecipeIngredientEntity[];

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Date;
}
