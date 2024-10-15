import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindProductResponseDto } from '../dtos/find-product-response.dto';
import { FindProductService } from '../services/find-product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly findProductService: FindProductService,
  ) {}

  @Get('/:code')
  @ApiResponse({ status: HttpStatus.OK, type: FindProductResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, example: { message: 'Product not found' } })
  async getProduct(
    @Param('code') code: string
  ): Promise<FindProductResponseDto> {
    return this.findProductService.execute(code);
  }
}
