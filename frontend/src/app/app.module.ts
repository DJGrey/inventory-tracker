import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientItemComponent } from './components/ingredient-item/ingredient-item.component';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { InventoryManagerComponent } from './components/inventory-manager/inventory-manager.component';
import { NumberDialogComponent } from './components/number-dialog/number-dialog.component';
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
    NumberDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
