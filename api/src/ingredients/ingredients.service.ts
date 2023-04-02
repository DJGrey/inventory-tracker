import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadIngredientDto } from './model/dto/read_ingredients.dto';
import { UpdateIngredientCountDto } from './model/dto/update_ingredients_count.dto';
import { IngredientEntity } from './model/entity/ingredient.entity';
import { StockChangeEntity } from './model/entity/stock_change.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientEntity)
    private ingredientRepository: Repository<IngredientEntity>,
    @InjectRepository(StockChangeEntity)
    private stockChangeRepository: Repository<StockChangeEntity>,
  ) {}

  async getIngredientCount(ingredientId: number): Promise<number> {
    // TODO: This should use the cached value in the ingredients table. However, this requires the trigger, which we is not yet implemented.
    const result = await this.stockChangeRepository
      .createQueryBuilder('stockChange')
      .select('SUM(stockQuantityChange)', 'sum')
      .where({ ingredientId })
      .getRawOne();

    return Number(result.cost) || 0;
  }

  async checkTotals(updates: UpdateIngredientCountDto[]): Promise<void> {
    // Ensure that there are enough of each ingredient in stock.
    updates.forEach(async (update) => {
      const currentCount = await this.getIngredientCount(update.id);

      // Update can be positive (i.e. stock is added) -  always allow this.
      if (
        update.quantityChange < 0 &&
        currentCount + update.quantityChange < 0
      ) {
        throw new HttpException(
          `Not enough of ingredient ${update.id} to allow update of stock levels with ${update.quantityChange} change`,
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    });
  }

  async addUpdates(
    updates: UpdateIngredientCountDto[],
    staffId: number,
    recipeId?: number,
  ): Promise<void> {
    const newStockChanges: Partial<StockChangeEntity>[] = updates.map(
      (update) => {
        return {
          ingredientId: update.id,
          stockQuantityChange: update.quantityChange,
          staffMemberId: staffId,
          type: update.changeType,
          recipeId: recipeId || null,
        };
      },
    );

    this.stockChangeRepository.insert(newStockChanges);
  }

  async getAll(): Promise<ReadIngredientDto[]> {
    const allIngredients = await this.ingredientRepository
      .createQueryBuilder('ingredient')
      .orderBy('ingredient.name', 'ASC')
      .getMany();

    return allIngredients.map((ingredient) => {
      return {
        id: ingredient.id,
        name: ingredient.name,
        // This count will be incorrect until trigger is set up.
        stockCount: ingredient.stockCount,
        unit: ingredient.unit,
        cost: ingredient.cost / 100,
      };
    });
  }
}
