import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './model/entity/recipe.entity';
import { RecipeIngredientEntity } from './model/entity/recipe_ingredient.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity, RecipeIngredientEntity])],
  providers: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule {}
