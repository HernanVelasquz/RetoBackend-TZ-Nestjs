import { ProductDomain } from '../model/product.model';

export interface IProductRepository<
  Model extends ProductDomain = ProductDomain,
> {
  findAllProduct(): Promise<Model[]>;
  findProductById(id: string): Promise<Model>;
  registerProduct(product: Model): Promise<Model>;
  updateProduct(id: string, product: Model): Promise<Model>;
  deleteProduct(id: string): Promise<Model>;
}
