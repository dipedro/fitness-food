import { Inject, Injectable } from "@nestjs/common";
import { PaginateBaseResponseContract } from "@shared/contracts/paginate-base-response.contract";
import { RepositoryNameEnum } from "@shared/enums";
import { FindProductResponseDto } from "../dtos/find-product-response.dto";
import { PaginateRequestDTO } from "../dtos/pagination-request.dto";
import { IProductRepository } from "../repositories/product.repository";

@Injectable()
export class FindProductsService {
  constructor(
	@Inject(RepositoryNameEnum.PRODUCT_REPOSITORY)
	private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: PaginateRequestDTO): Promise<PaginateBaseResponseContract<FindProductResponseDto>> {
	const { page = 1, size = 10 } = input;

	const products = await this.productRepository.findMany(input);
	const total = await this.productRepository.count();

	return {
		page,
		size,
		total,
		lastPage: Math.ceil(total / size),
		data: products
	};
  }
}