import { ApiProperty } from '@nestjs/swagger';
import { ProductDomain } from 'src/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Product' })
export class ProductEntity extends ProductDomain {
  @ApiProperty({
    example: '190abd72-db73-4ff7-996b-e5a107d5bd30',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Agua',
    description: 'Produt Name',
    uniqueItems: false,
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 0,
    description: 'Product Inventory',
    default: 0,
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  inventory: number;

  @ApiProperty({
    example: 0,
    description: 'Produt Price',
    default: 0,
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  price: number;

  @ApiProperty({
    example: true,
    description: 'Produt Enable',
    default: true,
  })
  @Column({ type: 'bool', default: true })
  enabled: boolean;

  @ApiProperty({
    example: 1,
    description: 'Produt Min Product Buy',
    default: 0,
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  min: number;

  @ApiProperty({
    example: 5,
    description: 'Produt Max Product Buy',
    default: 0,
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  max: number;
}
