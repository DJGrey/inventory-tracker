import { Unit } from "../enums/unit.enum";

export interface ReadIngredientDto {
  id: number;
  name: string;
  stockCount: number;
  unit: Unit;
  cost: number;
}

export interface ReadIngredientsDto {
  ingredients: ReadIngredientDto[];
}
