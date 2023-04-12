import { ProductDomain, PaginationDomain } from '../model';

export interface IProductRepository<
  Model extends ProductDomain = ProductDomain,
  Pag extends PaginationDomain = PaginationDomain,
> {
  findAllProduct(pagination: Pag): Promise<Model[]>;
  findProductById(id: string): Promise<Model>;
  registerProduct(product: Model): Promise<Model>;
  updateProduct(id: string, product: Model): Promise<Model>;
  deleteProduct(id: string): Promise<Model>;
}
