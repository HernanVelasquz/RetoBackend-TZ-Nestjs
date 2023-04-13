import { ApiProperty } from '@nestjs/swagger';
import { BuyDomain } from 'src/domain/model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'BuyClient' })
export class BuyEntity extends BuyDomain {
  @ApiProperty({
    example: '190abd72-db73-4ff7-996b-e5a107d5bd30',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'CC',
    nullable: false,
    minLength: 2,
  })
  @Column({ type: 'varchar', length: 5, nullable: false })
  documentType: string;

  @ApiProperty({
    example: '1001562345',
    nullable: false,
    minLength: 5,
  })
  @Column({ type: 'varchar', length: 15, nullable: false })
  noDocument: string;

  @ApiProperty({
    example: '2022-04-13',
    description: 'Date of purchase',
    minLength: 5,
  })
  @Column({ type: 'date', nullable: false })
  buyDate: Date;

  @ApiProperty({
    example: 'Hernan Velasquez',
    description: 'Name of the customer making the purchase',
    minLength: 3,
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  clientName: string;

  @ApiProperty({
    example: { '18d5e7a5-a979-4c67-b54c-3ffc6cd70051': 3 },
    description: 'Sending id and quantity of products to buy',
    type: 'object',
  })
  @Column({ type: 'jsonb' })
  product: Map<string, number>;
}
