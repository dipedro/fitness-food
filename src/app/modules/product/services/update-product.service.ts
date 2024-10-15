import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositoryNameEnum } from "@shared/enums";
import { UpdateProductRequestDTO } from "../dtos/update-product-request.dto";
import { IProductRepository } from "../repositories/product.repository";

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(RepositoryNameEnum.PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(code: string, body: UpdateProductRequestDTO): Promise<void> {

    if (!Object.keys(body).length)
      throw new BadRequestException('No fields to update');

	  await this.productRepository.update(code, body);
  }
}