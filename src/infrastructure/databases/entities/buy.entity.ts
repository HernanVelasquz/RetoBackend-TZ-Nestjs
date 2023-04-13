import { ApiProperty } from '@nestjs/swagger';
import { BuyDomain } from 'src/domain/model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'BuyClient' })
export class BuyEntity extends BuyDomain {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 5, nullable: false })
  documentType: string;
  @Column({ type: 'varchar', length: 15, nullable: false })
  noDocument: string;
  @Column({ type: 'date', nullable: false })
  buyDate: Date;
  @Column({ type: 'varchar', length: 255, nullable: false })
  clientName: string;
  @Column({ type: 'jsonb' })
  product: Map<string, number>;
}
