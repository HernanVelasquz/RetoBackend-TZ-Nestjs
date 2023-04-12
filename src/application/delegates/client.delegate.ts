import IClientReository from 'src/domain/repositories/client.repository';
import {
  FindAllBuyUseCase,
  FindBuyClientIdUseCase,
  IUseCase,
  RegisterBuyClientUseCase,
} from '../use-case';

export class ClientDelegate implements IUseCase {
  private delegate: IUseCase;
  constructor(private readonly clientBuyRepository: IClientReository) {}
  execute<Response>(...args: any[]): Promise<Response> {
    return this.delegate.execute(...args);
  }

  toFindAllBuy(): void {
    this.delegate = new FindAllBuyUseCase(this.clientBuyRepository);
  }

  toFindProductById(): void {
    this.delegate = new FindBuyClientIdUseCase(this.clientBuyRepository);
  }

  toRegisterClientBuy(): void {
    this.delegate = new RegisterBuyClientUseCase(this.clientBuyRepository);
  }
}
