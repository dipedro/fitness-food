
import { PaginateRequestDTO } from "@modules/product/dtos/pagination-request.dto";
import { UpdateProductRequestDTO } from "@modules/product/dtos/update-product-request.dto";
import { ProductStatusEnum } from "@modules/product/enums";
import { IProductRepository } from "@modules/product/repositories/product.repository";
import { Pg } from "../Pg";

export type Product = {
	code: string;
	url: string;
	creator: string;
	created_t: number;
	last_modified_t: number;
	product_name: string;
	quantity: string;
	brands: string;
	categories: string;
	labels: string;
	cities: string;
	purchase_places: string;
	stores: string;
	ingredients_text: string;
	traces: string;
	serving_size: string;
	serving_quantity: number;
	nutriscore_score: number;
	nutriscore_grade: string;
	main_category: string;
	image_url: string;
};

export class ProductPgRepository implements IProductRepository {
	pg: Pg;
	TABLE_NAME = 'products';

	constructor() {
		this.pg = Pg.getInstance();
	}
	
	async createMany(data: Product[]): Promise<void> {

		const values = data.map((product) => `(
			'${product.code}',
			'${product.url}',
			'${product.creator}',
			${product.created_t || 0},
			${product.last_modified_t || 0},
			'${product.product_name}',
			'${product.quantity}',
			'${product.brands}',
			'${product.categories}',
			'${product.labels}',
			'${product.cities}',
			'${product.purchase_places}',
			'${product.stores}',
			'${product.ingredients_text}',
			'${product.traces}',
			'${product.serving_size}',
			${product.serving_quantity || 0},
			${product.nutriscore_score || 0},
			'${product.nutriscore_grade}',
			'${product.main_category}',
			'${product.image_url}'
		)`)
		.join(', ');

		const sql = `
			INSERT INTO ${this.TABLE_NAME} (
				code,
				url,
				creator,
				created_t,
				last_modified_t,
				product_name,
				quantity,
				brands,
				categories,
				labels,
				cities,
				purchase_places,
				stores,
				ingredients_text,
				traces,
				serving_size,
				serving_quantity,
				nutriscore_score,
				nutriscore_grade,
				main_category,
				image_url
			)
			VALUES ${values}
			ON CONFLICT (code) DO NOTHING;
		`;

		await this.pg.query(sql);		
	}

	async findByCode(code: string): Promise<Product> {
		const sql = `
			SELECT * FROM ${this.TABLE_NAME}
			WHERE code = $1
			LIMIT 1;
		`;

		const result = await this.pg.query(sql, [code]);

		return result.rows[0];
	}

	async findMany(input: PaginateRequestDTO): Promise<Product[]> {
		const { page = 1, size = 10 } = input;

		const sql = `
			SELECT * FROM ${this.TABLE_NAME}
			LIMIT $1 OFFSET $2;
		`;

		const result = await this.pg.query(sql, [size, (page - 1) * size]);

		return result.rows;
	}

	async count(): Promise<number> {
		const sql = `
			SELECT COUNT(*) FROM ${this.TABLE_NAME};
		`;

		const result = await this.pg.query(sql);

		return parseInt(result.rows[0].count);
	}

	async delete(code: string): Promise<void> {
		const sql = `
			UPDATE ${this.TABLE_NAME}
			SET status = $1
			WHERE code = $2;
		`;

		await this.pg.query(sql, [ProductStatusEnum.TRASH, code]);
	}

	async update(code: string, body: UpdateProductRequestDTO): Promise<void> {
		const fields = Object.keys(body);

		const values = fields.map((field) => `${field} = '${body[field]}'`).join(', ');

		const sql = `
			UPDATE ${this.TABLE_NAME}
			SET ${values}
			WHERE code = $1;
		`;

		await this.pg.query(sql, [code]);
	}
}