import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockChangeType } from 'src/app/enums/stock_change_type.enum';
import { ReadRecipeDto } from 'src/app/models/read_recipes.dto';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  // TODO: Disable the recipe item by comparing required stock to the existing stock in FE.

  @Input() recipe!: ReadRecipeDto;
  @Input() staffId!: number;

  async onSell() {
    this.api
      .updateIngredientStockLevels(
        this.recipe.ingredients.map((ingredient) => {
          return {
            id: ingredient.id,
            quantityChange: -ingredient.quantity,
            changeType: StockChangeType.SALE,
          };
        }),
        this.staffId,
        this.recipe.id
      )
      .subscribe({
        complete: () => {
          this.snackBar.open('Sold!', 'Okay', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Not enough stock', 'Okay', { duration: 10000 });
        },
      });
  }
}
