import { Injectable } from "@nestjs/common";
import { IHealthRepository } from "@modules/health/repositories/health.repository";

@Injectable()
export class HealthInMemoryRepository implements IHealthRepository {

	private ERROR_MESSAGE = 'error';
	private OK_MESSAGE = 'ok';

	async getReadStatus(): Promise<string> {
		const random = Math.random();
		
		return random > 0.5 ? this.OK_MESSAGE : this.ERROR_MESSAGE;
	}

	async getWriteStatus(): Promise<string> {
		const random = Math.random();

		return random > 0.5 ? this.OK_MESSAGE : this.ERROR_MESSAGE;
	}
}