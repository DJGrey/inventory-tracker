import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateIngredientCountDto } from './model/dto/update_ingredients_count.dto';
import { StockChangeEntity } from './model/entity/stock_change.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(StockChangeEntity)
    private stockChangeRepository: Repository<StockChangeEntity>,
  ) {}

  async getIngredientCount(ingredientId: number): Promise<number> {
    // TOOD: This should use the cached value in the ingredients table. However, this requires the trigger, which we is not yet implemented.
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
  ): Promise<void> {
    const newStockChanges: Partial<StockChangeEntity>[] = updates.map(
      (update) => {
        return {
          ingredientId: update.id,
          stockQuantityChange: update.quantityChange,
          staffMemberId: staffId,
        };
      },
    );

    this.stockChangeRepository.insert(newStockChanges);
  }
}
