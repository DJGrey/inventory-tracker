import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { IngredientItemComponent } from './components/ingredient-item/ingredient-item.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffListComponent,
    RecipesListComponent,
    RecipeItemComponent,
    IngredientsListComponent,
    IngredientItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
