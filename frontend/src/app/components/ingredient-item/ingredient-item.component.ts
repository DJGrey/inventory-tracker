import { Component, Input } from '@angular/core';
import { ReadIngredientDto } from 'src/app/models/read_ingredients.dto';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss']
})
export class IngredientItemComponent {
  @Input() ingredient!: ReadIngredientDto;
}
