import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import {
  IProductRepository,
  PaginationDomain,
  ProductDomain,
} from 'src/domain';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository
{
  constructor(private readonly dataSources: DataSource) {
    super(ProductEntity, dataSources.createEntityManager());
  }

  async findAllProduct(
    paginationDTO: PaginationDomain,
  ): Promise<ProductDomain[]> {
    const { limit = 5, offset = 0 } = paginationDTO;
    return await this.find({ take: limit, skip: offset });
  }
  async findProductById(id: string): Promise<ProductDomain> {
    const productDatBase = await this.findOneBy({ id });
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
      await this.update(id, product);
      return this.findProductById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteProduct(id: string): Promise<ProductDomain> {
    try {
      const productDatabase = await this.findProductById(id);
      this.remove(productDatabase);
      return productDatabase;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
