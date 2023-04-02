import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadIngredientsDto } from 'src/app/models/read_ingredients.dto';
import { ReadRecipesDto } from 'src/app/models/read_recipes.dto';
import { ReadAllStaffDto } from 'src/app/models/read_staff.dto';
import {
  UpdateIngredientCountDto,
  UpdateIngredientsCountDto,
} from 'src/app/models/update_ingredients_count.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getStaff(): Observable<ReadAllStaffDto> {
    return this.http.get<ReadAllStaffDto>('/api/staff');
  }

  getRecipes(): Observable<ReadRecipesDto> {
    return this.http.get<ReadRecipesDto>('/api/recipes');
  }

  getIngredients(): Observable<ReadIngredientsDto> {
    return this.http.get<ReadIngredientsDto>('/api/ingredients');
  }

  updateIngredientStockLevels(
    updates: UpdateIngredientCountDto[],
    staffId: number,
    recipeId?: number
  ): Observable<void> {
    return this.http.post<void>('/api/ingredients/stock-changes', {
      updates,
      staffId,
      recipeId,
    } as UpdateIngredientsCountDto);
  }
}
