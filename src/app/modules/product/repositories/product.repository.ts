import { Product } from "@infra/databases/postgres/repositories/product.repository";

export interface IProductRepository {
	createMany(data: Product[]) : Promise<void>;
	findByCode(code: string): Promise<Product>;
}