import { Unit } from '../enum/unit.enum';

export class ReadIngredientDto {
  id: number;
  name: string;
  stockCount: number;
  unit: Unit;
  cost: number;
}

export class ReadIngredientsDto {
  ingredients: ReadIngredientDto[];
}
