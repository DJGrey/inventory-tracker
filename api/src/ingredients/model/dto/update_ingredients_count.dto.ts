export class UpdateIngredientCountDto {
  id: number;
  quantityChange: number;
}

export class UpdateIngredientsCountDto {
  updates: UpdateIngredientCountDto[];
  staffId: number;
}
