import { ProductDomain } from 'src/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Product' })
export class ProductEntity extends ProductDomain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  inventory: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  price: number;

  @Column({ type: 'bool', default: true })
  enabled: boolean;

  @Column({ type: 'int', nullable: false, default: 0 })
  min: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  max: number;
}
