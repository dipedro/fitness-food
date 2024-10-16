
import { ICronHistoryRepository } from "@infra/crons/nestjs-scheduler/repositories/cron-history.repository";
import { IHealthCronHistoryRepository } from "@modules/health/repositories/health-cron-history.repository";


export class CronHistoryInMemoryRepository implements ICronHistoryRepository, IHealthCronHistoryRepository {

	constructor(
	) {}

	async create(): Promise<number> {
		return 1;
	}

	async findLastImportedAt(): Promise<Date | null> {
		return new Date();
	}

	async updateImportedAt(): Promise<void> {
		return;
	}
}