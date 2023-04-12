import { RegisterProductUseCase } from 'src/application/use-case';
import { IProductRepository, ProductDomain } from 'src/domain';

describe('RegisterUseCase', () => {
  let useCase: RegisterProductUseCase;
  let repository: IProductRepository;

  beforeEach(() => {
    repository = { registerProduct: jest.fn() } as any as IProductRepository;
    useCase = new RegisterProductUseCase(repository);
  });

  it('I define the use case', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.create', (done) => {
    // Arrange
    const id = '4ae27a28-b99a-4fa1-813e-710ca8762eff';
    const payload = {
      id: '4ae27a28-b99a-4fa1-813e-710ca8762eff',
      name: 'Pollo',
      inventory: 500,
      enabled: true,
      min: 6,
      max: 30,
    };
    const mockData = {
      name: 'Pollo',
      inventory: 500,
      enabled: true,
      min: 6,
      max: 30,
    };
    const expecteData = {
      id,
      name: 'Pollo',
      inventory: 500,
      enabled: true,
      min: 6,
      max: 30,
    };
    const expectedInstanceType = Promise<ProductDomain>;
    const solvePromise = jest.fn((): any => {
      new Promise<ProductDomain>((resolve) => {
        resolve({ id, ...mockData } as ProductDomain);
      });
    });
    jest.spyOn(repository, 'registerProduct').mockReturnValue(solvePromise());
    // Act
    const resolt = useCase.execute(payload);
    // Assert
    expect(repository.registerProduct).toHaveBeenCalledWith(mockData);
    expect(resolt).toBeInstanceOf(expectedInstanceType);
    resolt.then((data) => {
      expect(data).toEqual(expecteData);
      done();
    });
  });
});
