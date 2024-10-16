
import { CreateManyProductPreloadDto, IProductPreloadRepository } from "@infra/crons/nestjs-scheduler/repositories/product-preload.repository";
import { IDatabaseService } from "../../interfaces/database.interface";
import { Inject } from "@nestjs/common";

export class ProductPreloadPgRepository implements IProductPreloadRepository {
	TABLE_NAME = 'products_preloads';

	constructor(
		@Inject('IDatabaseService')
		private readonly pg: IDatabaseService
	) {}
	
	async createMany({ productData, cronId }: CreateManyProductPreloadDto): Promise<void> {
		const values = productData
			.map((data) => {
				const escapedData = JSON.stringify(data);

				return `(${cronId}, '${escapedData}'::jsonb)`;
			})
			.join(', ');

		const sql = `
			INSERT INTO ${this.TABLE_NAME} (cron_id, product_data)
			VALUES ${values};
		`;

		await this.pg.query(sql);		
	}

	async findByCronId(cronId: number): Promise<Object[]> {
		const sql = `
			SELECT product_data
			FROM ${this.TABLE_NAME}
			WHERE cron_id = $1 AND import_t IS NULL;
		`;

		const { rows } = await this.pg.query(sql, [cronId]);

		return rows.map((row) => row.product_data);
	}

	async updateImportedAt(cronId: number): Promise<void> {
		const sql = `
			UPDATE ${this.TABLE_NAME}
			SET import_t = NOW()
			WHERE cron_id = $1;
		`;

		await this.pg.query(sql, [cronId]);
	}
}