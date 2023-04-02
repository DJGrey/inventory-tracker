import { Controller, Get } from '@nestjs/common';
import { ReadRecipesDto } from './model/dto/read_recipes.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  async findAll(): Promise<ReadRecipesDto> {
    return {
      recipes: await this.recipesService.getAll(),
    };
  }
}
