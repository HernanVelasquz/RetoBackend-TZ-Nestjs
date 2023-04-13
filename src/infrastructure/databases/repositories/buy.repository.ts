import {
  BadRequestException,
  Injectable,
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
    const newProductBuy = this.create({
      ...productBuy,
      buyDate: new Date(),
    });
    await this.validation(productBuy.product);
    return await this.save(newProductBuy);
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

  private async validation(products: Map<string, number>): Promise<void> {
    for (const [idProduct, quantity] of Object.entries(products)) {
      const { min, max, inventory, enabled } =
        await this.productRepository.findOneBy({
          id: idProduct,
        });
      if (quantity < min) {
        throw new BadRequestException(
          `You can't buy less than ${min} units of ${idProduct}.`,
        );
      }
      if (quantity > max) {
        throw new BadRequestException(
          `You can't buy more than ${max} units of ${idProduct}.`,
        );
      }
      if (!enabled) {
        throw new BadRequestException(
          `You cannot buy with product id ${idProduct}, there is no stock available`,
        );
      }
      this.descontDatabase(inventory, quantity, enabled, idProduct);
    }
  }

  private async descontDatabase(
    inventory: number,
    quantity: number,
    enabled: boolean,
    idProduct: string,
  ) {
    if (inventory - quantity <= 0) enabled = false;
    await this.productRepository.update(idProduct, {
      inventory: inventory - quantity,
      enabled: enabled,
    });
  }
}
