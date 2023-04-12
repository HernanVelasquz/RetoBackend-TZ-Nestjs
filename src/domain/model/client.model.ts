import { ProductBuyDomain } from './productBuy.model';

export class ClientDomain {
  documentType: string;
  noDocument: string;
  buyDate: Date;
  clientName: string;
  product: ProductBuyDomain[];
}
