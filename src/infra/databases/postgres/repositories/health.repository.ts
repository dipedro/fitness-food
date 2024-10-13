import { IHealthRepository } from "@modules/health/repositories/health.repository";
import { Pg } from "../Pg";

export class HealthPgRepository implements IHealthRepository {
	pg: Pg;
	private ERROR_MESSAGE = 'error';
	private OK_MESSAGE = 'ok';

	constructor() {
		this.pg = Pg.getInstance();
	}

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