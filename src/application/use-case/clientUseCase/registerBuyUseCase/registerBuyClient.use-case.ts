import { IUseCase } from 'src/application/use-case/interfaces/use-case.interface';
import { BuyDomain, IBuyRepository } from 'src/domain';

export class RegisterBuyClientUseCase implements IUseCase {
  constructor(private readonly buyRepository: IBuyRepository) {}
  async execute(productBuy: BuyDomain): Promise<BuyDomain> {
    return await this.buyRepository.registerBuy(productBuy);
  }
}
