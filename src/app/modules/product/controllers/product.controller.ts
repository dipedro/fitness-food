import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginateBaseResponseContract } from '@shared/contracts/paginate-base-response.contract';
import { PaginatedApiResponse } from '@shared/decorators/paginated-api-response.decorator';
import { FindProductResponseDto } from '../dtos/find-product-response.dto';
import { PaginateRequestDTO } from '../dtos/pagination-request.dto';
import { FindProductService } from '../services/find-product.service';
import { FindProductsService } from '../services/find-products.service';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(
    private readonly findProductService: FindProductService,
    private readonly findProductsService: FindProductsService
  ) {}

  @Get()
  @PaginatedApiResponse(FindProductResponseDto)
  async getProducts(
    @Query() request: PaginateRequestDTO
  ): Promise<PaginateBaseResponseContract<FindProductResponseDto>> {
    return this.findProductsService.execute(request);
  }

  @Get('/:code')
  @ApiResponse({ status: HttpStatus.OK, type: FindProductResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, example: { message: 'Product not found' } })
  async getProduct(
    @Param('code') code: string
  ): Promise<FindProductResponseDto> {
    return this.findProductService.execute(code);
  }
}
