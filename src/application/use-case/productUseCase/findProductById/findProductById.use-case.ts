import { IProductRepository, ProductDomain } from 'src/domain';
import { IUseCase } from '../../interfaces/use-case.interface';

export class FindProductByIdUseCase implements IUseCase {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(id: string): Promise<ProductDomain> {
    return await this.productRepository.findProductById(id);
  }
}
