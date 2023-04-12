import { BuyDomain, PaginationDomain } from '../model';

export interface IBuyRepository<
  Model extends BuyDomain = BuyDomain,
  Pag extends PaginationDomain = PaginationDomain,
> {
  registerBuy(productBuy: Model): Promise<Model>;
  findAllBuy(pagination: Pag): Promise<Model[]>;
  findBuyClientId(id: string): Promise<Model>;
}
