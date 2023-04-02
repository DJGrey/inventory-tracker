import { Body, Controller, Post } from '@nestjs/common';
import { UpdateIngredientsCountDto } from './model/dto/update_ingredients_count.dto';

@Controller('ingredients')
export class IngredientsController {
  @Post('changes')
  async updateIngedientCounts(
    @Body() body: UpdateIngredientsCountDto,
  ): Promise<void> {
    return;
  }
}
