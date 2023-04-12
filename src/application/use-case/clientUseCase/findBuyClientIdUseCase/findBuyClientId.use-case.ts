import { BuyDomain, IBuyRepository } from 'src/domain';
import { IUseCase } from '../../interfaces/use-case.interface';

export class FindBuyClientIdUseCase implements IUseCase {
  constructor(public readonly buyRepository: IBuyRepository) {}
  async execute(idBuy: string): Promise<BuyDomain> {
    return await this.buyRepository.findBuyClientId(idBuy);
  }
}
