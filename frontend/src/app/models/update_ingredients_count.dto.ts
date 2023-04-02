import { StockChangeType } from '../enums/stock_change_type.enum';

export interface UpdateIngredientCountDto {
  id: number;
  quantityChange: number;
  changeType: StockChangeType;
}

export interface UpdateIngredientsCountDto {
  updates: UpdateIngredientCountDto[];
  recipeId?: number;
  staffId: number;
}
