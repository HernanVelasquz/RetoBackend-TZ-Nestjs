import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BuyDelegate } from 'src/application/delegates/buy.delegate';
import { BuyEntity } from '../databases/entities/buy.entity';
import { BuyRepository } from '../databases/repositories/buy.repository';
import { BuyDTO } from '../dto/buy.dto';
import { PaginationDTO } from '../dto/pagination.dto';

@ApiTags('Buy')
@Controller('buy')
export class BuyApi {
  private readonly buyUseCase: BuyDelegate;

  constructor(private readonly buyRepoitory: BuyRepository) {
    this.buyUseCase = new BuyDelegate(this.buyRepoitory);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The Buy found all Products',
    type: BuyEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  findAllBuy(@Query() paginationDto: PaginationDTO): Promise<BuyEntity[]> {
    this.buyUseCase.toFindAllBuy();
    return this.buyUseCase.execute<BuyEntity[]>(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Buy found by id Product',
    type: BuyEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'The Buy not found',
  })
  findBuyById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.buyUseCase.toFindProductById();
    return this.buyUseCase.execute(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Buy was created successfully',
    type: BuyEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  registerBuyProduct(@Body() buyDto: BuyDTO) {
    this.buyUseCase.toRegisterClientBuy();
    return this.buyUseCase.execute(buyDto);
  }
}
