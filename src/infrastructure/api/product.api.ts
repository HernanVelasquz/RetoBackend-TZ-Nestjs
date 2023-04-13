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

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDelegate } from 'src/application/delegates/product.delegate';
import { ProductEntity } from '../databases/entities/product.entity';
import { ProductRepository } from '../databases/repositories/product.repository';
import { PaginationDTO } from '../dto/pagination.dto';
import { ProductDTO } from '../dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductApi {
  private readonly productUseCase: ProductDelegate;

  constructor(private readonly productRepository: ProductRepository) {
    this.productUseCase = new ProductDelegate(this.productRepository);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The Product found all Products',
    type: ProductEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  findAll(@Query() paginationDto: PaginationDTO): Promise<ProductEntity[]> {
    this.productUseCase.toFindProduct();
    return this.productUseCase.execute<ProductEntity[]>(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Product found by id Product',
    type: ProductEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'The Product not found',
  })
  findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ProductEntity> {
    this.productUseCase.toFindProductById();
    return this.productUseCase.execute(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product was created successfully',
    type: ProductEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
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
