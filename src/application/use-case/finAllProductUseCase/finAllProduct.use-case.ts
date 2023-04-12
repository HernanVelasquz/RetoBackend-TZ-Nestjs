import {
  IProductRepository,
  ProductDomain,
  PaginationDomain,
} from 'src/domain';
import { IUseCase } from '../interfaces/use-case.interface';

export class FindAllProductUseCase implements IUseCase {
  constructor(private readonly productService: IProductRepository) {}
  async execute(pagination: PaginationDomain): Promise<ProductDomain[]> {
    return this.productService.findAllProduct(pagination);
  }
}
