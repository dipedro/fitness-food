import { Pool } from 'pg';
import { IDatabaseService } from "../interfaces/database.interface";

export class DatabasePgService implements IDatabaseService {
	private pool: Pool;
	
	constructor() {
		this.pool = new Pool({
			user: process.env.PG_USER,
			host: process.env.PG_HOST,
			database: process.env.PG_DATABASE,
			password: process.env.PG_PASSWORD,
			port: parseInt(process.env.PG_PORT),
		});
	}

	async onModuleDestroy() {
		await this.pool.end();
	}

	async query(query: string, values: any[] = []): Promise<any> {
		const client = await this.pool.connect();
		try {
			return await client.query(query, values);
			
		} finally {
			client.release();
		}
	}
}