import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductApi } from '../api/product.api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../databases/entities/product.entity';
import { ProductRepository } from '../databases/repositories/product.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ProductEntity, ProductRepository]),
  ],
  controllers: [ProductApi],
  providers: [ProductRepository],
  exports: [TypeOrmModule],
})
export class ProductModule {}
