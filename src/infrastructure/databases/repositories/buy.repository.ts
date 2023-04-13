import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BuyDomain, IBuyRepository, PaginationDomain } from 'src/domain';
import { DataSource, Repository } from 'typeorm';
import { BuyEntity } from '../entities/buy.entity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class BuyRepository
  extends Repository<BuyEntity>
  implements IBuyRepository
{
  constructor(
    private readonly dataSources: DataSource,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
    super(BuyEntity, dataSources.createEntityManager());
  }

  async registerBuy(productBuy: BuyDomain): Promise<BuyDomain> {
    try {
      const newProductBuy = this.create({
        ...productBuy,
        buyDate: new Date(),
      });
      await this.descountProductDb(productBuy.product);
      return await this.save(newProductBuy);
    } catch (error) {
      this.hadlerExeption(error);
    }
  }

  async findAllBuy(pagination: PaginationDomain): Promise<BuyDomain[]> {
    const { limit = 5, offset = 0 } = pagination;
    return await this.find({ take: limit, skip: offset });
  }
  async findBuyClientId(id: string): Promise<BuyDomain> {
    const buyDatabase = await this.findOneBy({ id });
    if (!buyDatabase)
      throw new NotFoundException(`The Buy with id ${id} does not exist`);
    return buyDatabase;
  }

  private async descountProductDb(
    products: Map<string, number>,
  ): Promise<void> {
    for (const [idProduct, quantity] of Object.entries(products)) {
      const { min, max, ...product } = await this.productRepository.findOneBy({
        id: idProduct,
      });
      if (quantity < min) {
        throw new BadRequestException(
          `You can't buy less than ${min} units of ${product.id}.`,
        );
      }
      if (quantity > max) {
        throw new BadRequestException(
          `You can't buy more than ${max} units of ${product.id}.`,
        );
      }
      if (!product.enabled) {
        throw new BadRequestException(
          `You cannot buy with product id ${idProduct}, there is no stock available`,
        );
      }
      if (product.inventory - quantity <= 0) product.enabled = false;
      await this.productRepository.update(idProduct, {
        inventory: product.inventory - quantity,
        enabled: product.enabled,
      });
    }
  }

  private hadlerExeption(error: any) {
    throw new InternalServerErrorException(error);
  }
}
