import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    description: 'Limit to Pagination',
    nullable: true,
    required: false,
    default: 5,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'Pagination start value',
    nullable: true,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
