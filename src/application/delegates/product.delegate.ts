import { IProductRepository } from 'src/domain/repositories';
import {
  DeleteProductUseCase,
  FindAllProductUseCase,
  FindProductByIdUseCase,
  IUseCase,
  RegisterProductUseCase,
  UpdateProductUseCase,
} from '../use-case';

export class ProductDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly productRepository: IProductRepository) {}
  execute<Response>(...args: any[]): Promise<Response> {
    return this.delegate.execute(...args);
  }

  toFindProduct(): void {
    this.delegate = new FindAllProductUseCase(this.productRepository);
  }

  toFindProductById(): void {
    this.delegate = new FindProductByIdUseCase(this.productRepository);
  }

  toRegisterProduct(): void {
    this.delegate = new RegisterProductUseCase(this.productRepository);
  }

  toUpdateProduct(): void {
    this.delegate = new UpdateProductUseCase(this.productRepository);
  }

  toDeleteProduct(): void {
    this.delegate = new DeleteProductUseCase(this.productRepository);
  }
}
