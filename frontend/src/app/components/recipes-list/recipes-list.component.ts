import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadRecipesDto } from 'src/app/models/read_recipes.dto';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
  constructor(private api: ApiService) {}

  @Input() staffId!: number;

  recipesList: Observable<ReadRecipesDto> = this.api.getRecipes()!;
}
