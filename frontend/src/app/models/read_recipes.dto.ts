export interface RecipeIngredientDto {
  id: number;
  quantity: number;
}

export interface ReadRecipeDto {
  id: number;
  name: string;
  price: number;
  ingredients: RecipeIngredientDto[];
}

export interface ReadRecipesDto {
  recipes: ReadRecipeDto[];
}
