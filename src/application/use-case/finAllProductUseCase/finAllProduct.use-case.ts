import { IProductRepository, ProductDomain } from 'src/domain';
import { IUseCase } from '../interfaces/use-case.interface';

export class FindAllProductUseCase implements IUseCase {
  constructor(private readonly productService: IProductRepository) {}
  async execute(): Promise<ProductDomain[]> {
    return await this.productService.findAllProduct();
  }
}
