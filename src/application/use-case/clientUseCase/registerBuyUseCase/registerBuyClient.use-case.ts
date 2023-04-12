import { IUseCase } from 'src/application/use-case/interfaces/use-case.interface';
import { ClientDomain } from 'src/domain';
import IClientReository from 'src/domain/repositories/client.repository';

export class RegisterBuyClientUseCase implements IUseCase {
  constructor(private readonly clienteBuyRepository: IClientReository) {}
  async execute(productBuy: ClientDomain): Promise<ClientDomain> {
    return await this.clienteBuyRepository.registerBuy(productBuy);
  }
}
