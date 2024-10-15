
import { Pg } from "../Pg";
import { IProductRepository } from "@modules/product/repositories/product.repository";

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
			WHERE code = '${code}'
			LIMIT 1;
		`;

		const result = await this.pg.query(sql);

		return result.rows[0];
	}
}