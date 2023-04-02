import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { CsvParser } from 'nest-csv-parser';
import * as path from 'path';
import { Repository } from 'typeorm';
import { IngredientEntity } from './ingredients/model/entity/ingredient.entity';
import { StockChangeEntity } from './ingredients/model/entity/stock_change.entity';
import { StockChangeType } from './ingredients/model/enum/stock_change_type.enum';
import { Unit } from './ingredients/model/enum/unit.enum';
import { IngredientCsvRow } from './model/csv/ingredients.csv';
import { MenusCsvRow } from './model/csv/menus.csv';
import { RecipesCsvRow } from './model/csv/recipes.csv';
import { StaffCsvRow } from './model/csv/staff.csv';
import { RecipeEntity } from './recipes/model/entity/recipe.entity';
import { RecipeIngredientEntity } from './recipes/model/entity/recipe_ingredient.entity';
import { RecipePrice } from './recipes/model/util/recipe_price.interface';
import { StaffEntity } from './staff/model/entity/staff.entity';
import { Role } from './staff/model/enum/role.enum';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private csvParser: CsvParser,
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(IngredientEntity)
    private ingredientRepository: Repository<IngredientEntity>,
    @InjectRepository(RecipeIngredientEntity)
    private recipeIngredientRepository: Repository<RecipeIngredientEntity>,
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
    @InjectRepository(StockChangeEntity)
    private stockChangeRepository: Repository<StockChangeEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    console.log(
      `API Initialising. Loading data from CSV for location ${process.env.LOCATION_ID}`,
    );
    await this.handleImportsFromCsv();
  }

  async handleImportsFromCsv() {
    console.log('Getting recipe prices');
    const recipePrices = await this.importRecipesFromCsv();
    console.log(`Found ${recipePrices.length} recipes`);

    console.log('Getting all ingredients in location');
    const ingredientIds = await this.getAllIngredientIdsFromCsv(recipePrices);
    console.log(`Found ${ingredientIds.length} ingredients`);

    console.log('Importing ingredients');
    await this.importIngredientsFromCsv(ingredientIds);

    console.log('Importing recipes');
    await this.importRecipeIngredientsLinksFromCsv(recipePrices, ingredientIds);

    console.log('Importing staff');
    await this.importStaffFromCsv();

    // NOTE: Uncomment this to test selling recipes quickly.
    // console.log('Artificially increasing stock for testing');
    // await this.increaseStock(ingredientIds, 10);
  }

  async importRecipesFromCsv(): Promise<RecipePrice[]> {
    path.resolve(__dirname, 'data_exports/menus.csv');
    const stream = createReadStream(
      path.resolve(__dirname, '../data_exports/menus.csv'),
    );

    const rows: MenusCsvRow[] = (
      await this.csvParser.parse(stream, MenusCsvRow, undefined, undefined, {
        strict: true,
        separator: ',',
      })
    ).list;

    return rows.reduce((acc, val): RecipePrice[] => {
      // Check if recipe is used at this location.
      if (val.location_id !== process.env.LOCATION_ID) {
        return acc;
      }

      return [
        ...acc,
        {
          id: parseInt(val.recipe_id),
          price: Math.ceil(parseFloat(val.price) * 100),
        },
      ];
    }, []);
  }

  async getAllIngredientIdsFromCsv(
    recipePrices: RecipePrice[],
  ): Promise<number[]> {
    const stream = createReadStream(
      path.resolve(__dirname, '../data_exports/recipes.csv'),
    );

    const rows: RecipesCsvRow[] = (
      await this.csvParser.parse(stream, RecipesCsvRow, undefined, undefined, {
        strict: true,
        separator: ',',
      })
    ).list;

    console.log(`Found ${rows.length} rows for ingredients`);

    return [
      ...new Set(
        rows.reduce((acc, val): number[] => {
          const recipePrice = recipePrices.find(
            (rp) => rp.id === parseInt(val.recipe_id),
          );

          // Check if recipe is used as this location.
          if (recipePrice === undefined) {
            return acc;
          }
          return [...acc, parseInt(val.ingredient_id)];
        }, []),
      ),
    ];
  }

  async importRecipeIngredientsLinksFromCsv(
    recipePrices: RecipePrice[],
    allIngredientIds: number[],
  ) {
    const stream = createReadStream(
      path.resolve(__dirname, '../data_exports/recipes.csv'),
    );

    const rows: RecipesCsvRow[] = (
      await this.csvParser.parse(stream, RecipesCsvRow, undefined, undefined, {
        strict: true,
        separator: ',',
      })
    ).list;

    // For each recipe.
    for (const recipePrice of recipePrices) {
      const recipeIngredientLinks: Partial<RecipeIngredientEntity>[] = [];

      const newRecipe: Partial<RecipeEntity> = {
        id: recipePrice.id,
        price: recipePrice.price,
      };

      // Get all ingredients in the recipe.
      rows.forEach((row) => {
        // Check if recipe is used as this location.
        if (recipePrice.id !== parseInt(row.recipe_id)) {
          return;
        }

        newRecipe.name = row.name;

        if (!allIngredientIds.includes(parseInt(row.ingredient_id))) {
          console.warn(
            `Ingredient ${row.ingredient_id} in recipe ${row.recipe_id} not found for this location`,
          );
          return;
        }
        recipeIngredientLinks.push({
          ingredientId: parseInt(row.ingredient_id),
          recipeId: parseInt(row.recipe_id),
          ingredientQuantity: parseFloat(row.quantity),
        });
      });

      // Save inserts if it doesn't already exists or updates if it does.
      await this.recipeRepository.save(newRecipe);
      await this.recipeIngredientRepository.save(recipeIngredientLinks);
    }
  }

  async importIngredientsFromCsv(neededIds: number[]): Promise<void> {
    const stream = createReadStream(
      path.resolve(__dirname, '../data_exports/ingredients.csv'),
    );

    const ingredientsRows: IngredientCsvRow[] = (
      await this.csvParser.parse(
        stream,
        IngredientCsvRow,
        undefined,
        undefined,
        {
          strict: true,
          separator: ',',
        },
      )
    ).list;

    for (const row of ingredientsRows) {
      // Check if ingredients are needed by this location.
      if (!neededIds.includes(parseInt(row.ingredient_id))) {
        continue;
      }

      // Insert ingredient into database.
      const newIngredient: Partial<IngredientEntity> = {
        id: parseInt(row.ingredient_id),
        name: row.name,
        cost: Math.ceil(parseFloat(row.cost) * 100),
        unit: Unit[row.unit.toUpperCase()],
      };

      // Save inserts if it doesn't already exists or updates if it does.
      await this.ingredientRepository.save(newIngredient);
    }
  }

  async importStaffFromCsv(): Promise<void> {
    const stream = createReadStream(
      path.resolve(__dirname, '../data_exports/staff.csv'),
    );

    const rows: StaffCsvRow[] = (
      await this.csvParser.parse(stream, StaffCsvRow, undefined, undefined, {
        strict: true,
        separator: ',',
      })
    ).list;

    for (const row of rows) {
      // Check if recipe is used at this location.
      if (row.location_id.toString() !== process.env.LOCATION_ID) {
        continue;
      }

      // Insert ingredient into database.
      const newStaff: Partial<StaffEntity> = {
        id: parseInt(row.staff_id),
        name: row.name,
        role: Role[row.role.toUpperCase().replaceAll('-', '_')],
      };

      // Save inserts if it doesn't already exists or updates if it does.
      await this.staffRepository.save(newStaff);
    }
  }

  async increaseStock(ingredientIds: number[], quantity: 10): Promise<void> {
    const staffMembers = await this.staffRepository.find();

    const changes: Partial<StockChangeEntity>[] = ingredientIds.map(
      (ingredientId) => {
        return {
          ingredientId,
          // Get a random staff member.
          staffMemberId:
            staffMembers[Math.floor(Math.random() * staffMembers.length)].id,
          stockQuantityChange: quantity,
          type: StockChangeType.OTHER,
        };
      },
    );

    this.stockChangeRepository.save(changes);
  }

  getHello(): string {
    return 'API';
  }
}
