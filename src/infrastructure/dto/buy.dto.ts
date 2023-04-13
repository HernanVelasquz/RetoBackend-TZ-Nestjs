import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BuyDomain } from 'src/domain';

export class BuyDTO extends BuyDomain {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  @MinLength(1)
  documentType: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(5)
  noDocument: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  clientName: string;
  @IsNotEmptyObject()
  product: Map<string, number>;
}
