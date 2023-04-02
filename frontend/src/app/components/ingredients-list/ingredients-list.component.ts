import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss'],
})
export class IngredientsListComponent {
  constructor(private api: ApiService) {}

  @Input() staffId!: number;

  ingredientsList = this.api.getIngredients();
}
