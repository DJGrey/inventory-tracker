export class RecipeIngredientDto {
  id: number;
  quantity: number;
}

export class ReadRecipeDto {
  id: number;
  name: string;
  price: number;
  ingredients: RecipeIngredientDto[];
}

export class ReadRecipesDto {
  recipes: ReadRecipeDto[];
}
