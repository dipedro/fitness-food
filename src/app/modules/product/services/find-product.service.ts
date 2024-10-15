import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RepositoryNameEnum } from "@shared/enums";
import { FindProductResponseDto } from "../dtos/find-product-response.dto";
import { IProductRepository } from "../repositories/product.repository";

@Injectable()
export class FindProductService {
  constructor(
	@Inject(RepositoryNameEnum.PRODUCT_REPOSITORY)
	private readonly productRepository: IProductRepository,
  ) {}

  async execute(code: string): Promise<FindProductResponseDto> {
	const product = await this.productRepository.findByCode(code);

	if (!product) 
		throw new NotFoundException('Product not found');

	return product;
  }
}