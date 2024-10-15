import { Product } from "@infra/databases/postgres/repositories/product.repository";
import { PaginateRequestDTO } from "../dtos/pagination-request.dto";
import { UpdateProductRequestDTO } from "../dtos/update-product-request.dto";

export interface IProductRepository {
	createMany(data: Product[]) : Promise<void>;
	findByCode(code: string): Promise<Product>;
	findMany(input: PaginateRequestDTO): Promise<Product[]>;
	count(): Promise<number>;
	delete(code: string): Promise<void>;
	update(code: string, body: UpdateProductRequestDTO): Promise<void>;
}