import IClientReository from 'src/domain/repositories/client.repository';
import { IUseCase } from '../../interfaces/use-case.interface';
import { ClientDomain, PaginationDomain } from 'src/domain';

export class FindAllBuyUseCase implements IUseCase {
  constructor(private readonly clientBuyRepository: IClientReository) {}
  async execute(pagination: PaginationDomain): Promise<ClientDomain[]> {
    return this.clientBuyRepository.findAllBuy(pagination);
  }
}
