import { IHealthRepository } from "@modules/health/repositories/health.repository";
import { IDatabaseService } from "../../interfaces/database.interface";
import { Inject } from "@nestjs/common";

export class HealthPgRepository implements IHealthRepository {
	private ERROR_MESSAGE = 'error';
	private OK_MESSAGE = 'ok';

	constructor(
		@Inject('IDatabaseService')
		private readonly pg: IDatabaseService
	) {}

	async getReadStatus(): Promise<string> {
		try {
			await this.pg.query('SELECT 1');
			return this.OK_MESSAGE;
		} catch (error) {
			return this.ERROR_MESSAGE;
		}
	}

	async getWriteStatus(): Promise<string> {
		const tableName = 'health_check';
		try {
			await this.pg.query(`CREATE TEMP TABLE ${tableName}(id SERIAL PRIMARY KEY)`);
			await this.pg.query(`DROP TABLE ${tableName}`);

			return this.OK_MESSAGE;
			
		} catch (error) {
			return this.ERROR_MESSAGE;
		}
	}
}