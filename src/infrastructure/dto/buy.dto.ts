import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BuyDomain } from 'src/domain';

export class BuyDTO extends BuyDomain {
  @IsString()
  @IsNotEmpty()
  @Max(5)
  documentType: string;
  @IsString()
  @IsNotEmpty()
  @Max(10)
  noDocument: string;
  @IsString()
  @IsNotEmpty()
  @Max(30)
  @Min(3)
  clientName: string;
  @IsNotEmptyObject()
  product: Map<string, number>;
}
