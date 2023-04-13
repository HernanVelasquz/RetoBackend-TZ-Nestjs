import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ProductDomain } from 'src/domain';

export class ProductDTO extends ProductDomain {
  @ApiProperty({
    description: 'Product Title',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'Inventory Product',
    nullable: false,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  inventory: number;

  @ApiProperty({
    description: 'Price Product',
    nullable: false,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Enable Product',
    nullable: false,
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  @ApiProperty({
    description: 'Min Product Buy',
    nullable: false,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  min: number;

  @ApiProperty({
    description: 'Max Product Buy',
    nullable: false,
    default: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(2)
  max: number;
}
