import { Component, Input } from '@angular/core';
import { ReadRecipeDto } from 'src/app/models/read_recipes.dto';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipe!: ReadRecipeDto;
}
