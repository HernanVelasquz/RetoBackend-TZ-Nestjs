import { ProductDomain } from 'src/domain';
import { IProductRepository } from 'src/domain/repositories';
import { IUseCase } from '../../interfaces/use-case.interface';

export class RegisterProductUseCase implements IUseCase {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(product: ProductDomain): Promise<ProductDomain> {
    return await this.productRepository.registerProduct(product);
  }
}
