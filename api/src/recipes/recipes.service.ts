import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadRecipeDto } from './model/dto/read_recipes.dto';
import { RecipeEntity } from './model/entity/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
  ) {}

  async getAll(): Promise<ReadRecipeDto[]> {
    const recipes = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
      .orderBy('recipe.name', 'ASC')
      .getMany();

    return recipes.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.name,
        price: recipe.price / 100,
        ingredients: recipe.recipeIngredients.map((ingredient) => {
          return {
            id: ingredient.ingredientId,
            quantity: ingredient.ingredientQuantity,
          };
        }),
      };
    });
  }
}
