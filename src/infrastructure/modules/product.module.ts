import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductApi } from '../api/product.api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../databases/entities/product.entity';
import { ProductRepository } from '../databases/repositories/product.repository';
import { BuyEntity } from '../databases/entities/buy.entity';
import { BuyRepository } from '../databases/repositories/buy.repository';
import { BuyApi } from '../api/buy.api';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductRepository,
      BuyEntity,
      BuyRepository,
    ]),
  ],
  controllers: [ProductApi, BuyApi],
  providers: [ProductRepository, BuyRepository],
  exports: [TypeOrmModule],
})
export class ProductModule {}
