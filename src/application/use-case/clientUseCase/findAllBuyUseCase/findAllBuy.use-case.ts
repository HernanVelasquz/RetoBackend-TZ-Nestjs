import { IUseCase } from '../../interfaces/use-case.interface';
import { BuyDomain, IBuyRepository, PaginationDomain } from 'src/domain';

export class FindAllBuyUseCase implements IUseCase {
  constructor(private readonly buyRepository: IBuyRepository) {}
  async execute(pagination: PaginationDomain): Promise<BuyDomain[]> {
    return this.buyRepository.findAllBuy(pagination);
  }
}
