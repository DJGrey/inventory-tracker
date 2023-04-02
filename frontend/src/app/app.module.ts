import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientItemComponent } from './components/ingredient-item/ingredient-item.component';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { InventoryManagerComponent } from './components/inventory-manager/inventory-manager.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffListComponent,
    RecipesListComponent,
    RecipeItemComponent,
    IngredientsListComponent,
    IngredientItemComponent,
    InventoryManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
