import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { IngredientEntity } from './model/entity/ingredient.entity';
import { StockChangeEntity } from './model/entity/stock_change.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity, StockChangeEntity])],
  providers: [IngredientsService],
  controllers: [IngredientsController],
})
export class IngredientsModule {}
