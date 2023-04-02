import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockChangeType } from 'src/app/enums/stock_change_type.enum';
import { ReadIngredientDto } from 'src/app/models/read_ingredients.dto';
import { ApiService } from 'src/app/services/api/api.service';
import { NumberDialogComponent } from '../number-dialog/number-dialog.component';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss'],
})
export class IngredientItemComponent {
  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  @Input() ingredient!: ReadIngredientDto;
  @Input() staffId!: number;

  async handleDelivery() {
    this.dialog
      .open(NumberDialogComponent, {
        data: {
          title: 'How much was delivered?',
          defaultValue: 0,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.data) {
          this.api
            .updateIngredientStockLevels(
              [
                {
                  id: this.ingredient.id,
                  quantityChange: res.data,
                  changeType: StockChangeType.DELIVERY,
                },
              ],
              this.staffId
            )
            .subscribe({
              complete: () => {
                this.snackBar.open('Delivery logged', 'Okay', {
                  duration: 2000,
                });
              },
              error: () => {
                this.snackBar.open('Something went wrong', 'Okay', {
                  duration: 10000,
                });
              },
            });
        }
      });
  }

  async handleWaste() {
    // TODO
  }

  async handleChange() {
    // TODO
  }
}
