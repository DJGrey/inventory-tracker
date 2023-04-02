import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { StockChangeType } from '../enum/stock_change_type.enum';

export class UpdateIngredientCountDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  id: number;

  @IsNotEmpty()
  @IsNumber()
  quantityChange: number;

  @IsNotEmpty()
  @IsEnum(StockChangeType, {
    message: 'Change type must be one of the limited allowed values',
  })
  changeType: StockChangeType;
}

export class UpdateIngredientsCountDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateIngredientCountDto)
  updates: UpdateIngredientCountDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  recipeId?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  staffId: number;
}
