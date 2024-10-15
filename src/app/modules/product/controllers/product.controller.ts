import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginateBaseResponseContract } from '@shared/contracts/paginate-base-response.contract';
import { PaginatedApiResponse } from '@shared/decorators/paginated-api-response.decorator';
import { FindProductResponseDto } from '../dtos/find-product-response.dto';
import { PaginateRequestDTO } from '../dtos/pagination-request.dto';
import { FindProductService } from '../services/find-product.service';
import { FindProductsService } from '../services/find-products.service';
import { DeleteProductService } from '../services/delete-product.service';
import { UpdateProductService } from '../services/update-product.service';
import { UpdateProductRequestDTO } from '../dtos/update-product-request.dto';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(
    private readonly findProductService: FindProductService,
    private readonly findProductsService: FindProductsService,
    private readonly deleteProductService: DeleteProductService,
    private readonly updateProductService: UpdateProductService
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

  @Delete('/:code')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteProduct(
    @Param('code') code: string
  ): Promise<void> {
    return this.deleteProductService.execute(code);
  }

  @Put('/:code')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, example: { message: 'No fields to update' } })
  async updateProduct(
    @Param('code') code: string,
    @Body() body: UpdateProductRequestDTO
  ): Promise<void> {
    return this.updateProductService.execute(code, body);
  }
}
