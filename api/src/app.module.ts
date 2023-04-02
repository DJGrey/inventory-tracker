import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { IngredientEntity } from './ingredients/model/entity/ingredient.entity';
import { RecipeEntity } from './recipes/model/entity/recipe.entity';
import { RecipeIngredientEntity } from './recipes/model/entity/recipe_ingredient.entity';
import { RecipesModule } from './recipes/recipes.module';
import { StaffEntity } from './staff/model/entity/staff.entity';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    StaffModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      RecipeEntity,
      IngredientEntity,
      RecipeIngredientEntity,
      StaffEntity,
    ]),
    IngredientsModule,
    RecipesModule,
    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
