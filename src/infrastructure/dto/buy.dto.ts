import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BuyDomain } from 'src/domain';

export class BuyDTO extends BuyDomain {
  @ApiProperty({
    description: 'Type Document',
    nullable: false,
    minLength: 2,
    maxLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  @MinLength(2)
  documentType: string;

  @ApiProperty({
    description: 'Number Document',
    nullable: false,
    minLength: 2,
    maxLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(5)
  noDocument: string;

  @ApiProperty({
    description: 'Name Client',
    nullable: false,
    minLength: 30,
    maxLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  clientName: string;

  @ApiProperty({
    description: 'Sending id and quantity of products to buy',
    nullable: false,
    type: 'object',
  })
  @IsNotEmptyObject()
  product: Map<string, number>;
}
