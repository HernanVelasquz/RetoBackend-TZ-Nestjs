import { ClientDomain } from 'src/domain';
import IClientReository from 'src/domain/repositories/client.repository';
import { IUseCase } from '../../interfaces/use-case.interface';

export class FindBuyClientIdUseCase implements IUseCase {
  constructor(public readonly clienteBuyRepository: IClientReository) {}
  async execute(idBuy: string): Promise<ClientDomain> {
    return await this.clienteBuyRepository.findBuyClientId(idBuy);
  }
}
