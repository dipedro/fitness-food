import { Inject, Injectable } from "@nestjs/common";
import { RepositoryNameEnum } from "@shared/enums";
import { IProductRepository } from "../repositories/product.repository";

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(RepositoryNameEnum.PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(code: string): Promise<void> {
	  await this.productRepository.delete(code);
  }
}