import { IUseCase } from '../interfaces/use-case.interface';
import { IProductRepository } from 'src/domain/repositories/product.repository';

export class DeleteProductUseCase implements IUseCase {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(id: string): Promise<boolean> {
    return await this.productRepository.deleteProduct(id);
  }
}
