export class IngredientCsvRow {
  ingredient_id: string;
  name: string;
  unit: 'liter' | 'milliliter' | 'centiliter' | 'deciliter';
  cost: string;
}
