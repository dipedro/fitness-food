
import { ICronHistoryRepository } from "@infra/crons/nestjs-scheduler/repositories/cron-history.repository";
import { Pg } from "../Pg";

export class CronHistoryPgRepository implements ICronHistoryRepository {
	pg: Pg;
	TABLE_NAME = 'crons_histories';

	constructor() {
		this.pg = Pg.getInstance();
	}

	async create(): Promise<number> {
		const query = `INSERT INTO ${this.TABLE_NAME} DEFAULT VALUES RETURNING id`;
		const { rows } = await this.pg.query(query);
		return rows[0].id;
	}

	async updateImportedAt(cronId: number): Promise<void> {
		const query = `UPDATE ${this.TABLE_NAME} SET import_t = NOW() WHERE id = $1`;
		await this.pg.query(query, [cronId]);
	}
}