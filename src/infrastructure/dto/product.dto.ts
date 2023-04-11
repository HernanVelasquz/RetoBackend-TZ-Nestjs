import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductDomain } from 'src/domain';

export class ProductDTO extends ProductDomain {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  inventory: number;
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  min: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  max: number;
}
