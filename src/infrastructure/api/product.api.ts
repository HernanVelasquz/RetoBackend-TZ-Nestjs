import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ProductDelegate } from 'src/application/delegates/product.delegate';
import { ProductEntity } from '../databases/entities/product.entity';
import { ProductRepository } from '../databases/repositories/product.repository';
import { PaginationDTO } from '../dto/pagination.dto';
import { ProductDTO } from '../dto/product.dto';

@Controller('product')
export class ProductApi {
  private readonly productUseCase: ProductDelegate;

  constructor(private readonly productRepository: ProductRepository) {
    this.productUseCase = new ProductDelegate(this.productRepository);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDTO): Promise<ProductEntity[]> {
    this.productUseCase.toFindProduct();
    return this.productUseCase.execute<ProductEntity[]>(paginationDto);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ProductEntity> {
    this.productUseCase.toFindProductById();
    return this.productUseCase.execute(id);
  }

  @Post()
  registerProduct(@Body() product: ProductDTO): Promise<ProductEntity> {
    this.productUseCase.toRegisterProduct();
    return this.productUseCase.execute(product);
  }

  @Put(':id')
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: ProductDTO,
  ): Promise<ProductEntity> {
    this.productUseCase.toUpdateProduct();
    return this.productUseCase.execute(id, product);
  }

  @Delete(':id')
  deleteProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ProductEntity> {
    this.productUseCase.toDeleteProduct();
    return this.productUseCase.execute(id);
  }
}
