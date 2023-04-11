import { IProductRepository, ProductDomain } from 'src/domain';
import { IUseCase } from '../interfaces/use-case.interface';

export class UpdateProductUseCase implements IUseCase {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(id: string, product: ProductDomain): Promise<ProductDomain> {
    return await this.productRepository.updateProduct(id, product);
  }
}
