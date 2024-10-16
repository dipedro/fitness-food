
import { ICronHistoryRepository } from "@infra/crons/nestjs-scheduler/repositories/cron-history.repository";
import { IHealthCronHistoryRepository } from "@modules/health/repositories/health-cron-history.repository";
import { Inject } from "@nestjs/common";
import { IDatabaseService } from "../../interfaces/database.interface";


export class CronHistoryPgRepository implements ICronHistoryRepository, IHealthCronHistoryRepository {
	TABLE_NAME = 'crons_histories';

	constructor(
		@Inject('IDatabaseService')
		private readonly pg: IDatabaseService
	) {}

	async create(): Promise<number> {
		const query = `INSERT INTO ${this.TABLE_NAME} DEFAULT VALUES RETURNING id`;
		const { rows } = await this.pg.query(query);
		return rows[0].id;
	}

	async findLastImportedAt(): Promise<Date | null> {
		const query = `SELECT cron_t FROM ${this.TABLE_NAME} ORDER BY cron_t DESC LIMIT 1`;
		const { rows } = await this.pg.query(query);
		return rows?.[0]?.cron_t;
	}

	async updateImportedAt(cronId: number): Promise<void> {
		const query = `UPDATE ${this.TABLE_NAME} SET import_t = NOW() WHERE id = $1`;
		await this.pg.query(query, [cronId]);
	}
}