import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BuyDomain, IBuyRepository, PaginationDomain } from 'src/domain';
import { DataSource, Repository } from 'typeorm';
import { BuyEntity } from '../entities/buy.entity';

@Injectable()
export class BuyRepository
  extends Repository<BuyEntity>
  implements IBuyRepository
{
  constructor(private readonly dataSources: DataSource) {
    super(BuyEntity, dataSources.createEntityManager());
  }

  async registerBuy(productBuy: BuyDomain): Promise<BuyDomain> {
    try {
      productBuy.buyDate = new Date();
      const newProductBuy = this.create(productBuy);
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

  private descountProductDb(products: Map<string, number>) {
    const map: Map<string, number> = new Map<string, number>();
    for (const [clave, valor] of products) {
      map.set(clave, valor);
    }

    console.log(map);

    // map.forEach()
  }
}
