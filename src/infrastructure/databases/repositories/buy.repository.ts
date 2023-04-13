import {
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
      productBuy.buyDate = new Date();
      const newProductBuy = this.create(productBuy);
      this.descountProductDb(productBuy.product);
      return await this.save(newProductBuy);
    } catch (error) {
      throw new InternalServerErrorException(error);
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
    for (const [idProduct, quality] of Object.entries(products)) {
      await this.productRepository
        .createQueryBuilder()
        .update(ProductEntity)
        .set({ inventory: () => `inventory - ${quality}` })
        .where(`id = :id `, { id: idProduct })
        .execute();
    }
  }

  // private async validationCantBuyProduct(): Promise<void> {}
}
