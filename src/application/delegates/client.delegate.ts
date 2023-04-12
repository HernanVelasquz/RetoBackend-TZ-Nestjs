import { IBuyRepository } from 'src/domain/repositories';
import {
  FindAllBuyUseCase,
  FindBuyClientIdUseCase,
  IUseCase,
  RegisterBuyClientUseCase,
} from '../use-case';

export class ClientDelegate implements IUseCase {
  private delegate: IUseCase;
  constructor(private readonly buyRepository: IBuyRepository) {}
  execute<Response>(...args: any[]): Promise<Response> {
    return this.delegate.execute(...args);
  }

  toFindAllBuy(): void {
    this.delegate = new FindAllBuyUseCase(this.buyRepository);
  }

  toFindProductById(): void {
    this.delegate = new FindBuyClientIdUseCase(this.buyRepository);
  }

  toRegisterClientBuy(): void {
    this.delegate = new RegisterBuyClientUseCase(this.buyRepository);
  }
}
