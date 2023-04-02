import { Body, Controller, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { UpdateIngredientsCountDto } from './model/dto/update_ingredients_count.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Post('changes')
  async updateIngedientCounts(
    @Body() body: UpdateIngredientsCountDto,
  ): Promise<void> {
    // There is a race condition here, which would be solved by using a Postgres trigger, but I don't have time to fix it at the moment.
    await this.ingredientsService.checkTotals(body.updates);
    await this.ingredientsService.addUpdates(
      body.updates,
      body.staffId,
      body.recipeId || null,
    );
  }
}
