import { ClientDomain, PaginationDomain } from '../model';

export default interface IClientReository<
  Model extends ClientDomain = ClientDomain,
  Pag extends PaginationDomain = PaginationDomain,
> {
  registerBuy(productBuy: Model): Promise<Model>;
  findAllBuy(pagination: Pag): Promise<Model[]>;
  findByClientId(id: string): Promise<Model>;
}
