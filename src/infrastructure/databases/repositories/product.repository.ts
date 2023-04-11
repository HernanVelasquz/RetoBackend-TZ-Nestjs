import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { IProductRepository, ProductDomain } from 'src/domain';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository
{
  constructor(private readonly dataSources: DataSource) {
    super(ProductEntity, dataSources.createEntityManager());
  }

  async findAllProduct(): Promise<ProductDomain[]> {
    return await this.find();
  }
  async findProductById(id: string): Promise<ProductDomain> {
    const productDatBase = this.findOneBy({ id });
    if (!productDatBase)
      throw new NotFoundException(`Product whit id ${id} not found`);
    return productDatBase;
  }
  async registerProduct(product: ProductDomain): Promise<ProductDomain> {
    try {
      const newProduct = this.create(product);
      await this.save(newProduct);
      return newProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateProduct(
    id: string,
    product: ProductDomain,
  ): Promise<ProductDomain> {
    try {
      const productDatabase = await this.findProductById(id);
      this.merge(productDatabase, product);
      return await this.save(productDatabase);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteProduct(id: string): Promise<ProductDomain> {
    try {
      const productDatabase = await this.findProductById(id);
      this.delete(productDatabase);
      return productDatabase;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
