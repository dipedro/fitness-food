
import { IProductRepository } from "@modules/product/repositories/product.repository";
import { Product } from "../../postgres/repositories/product.repository";

export class ProductInMemoryRepository implements IProductRepository {

	async createMany(): Promise<void> {
		return;
	}

	async findByCode(): Promise<Product> {
		return null;
	}

	async findMany(): Promise<Product[]> {
		return [];
	}

	async count(): Promise<number> {
		return 0;
	}

	async delete(): Promise<void> {
		return;
	}

	async update(): Promise<void> {
		return;
	}
}