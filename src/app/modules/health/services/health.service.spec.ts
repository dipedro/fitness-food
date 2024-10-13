import { HealthInMemoryRepository } from "@databases/in-memory/repositories/health.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { RepositoryNameEnum } from "@shared/enums";
import { IHealthRepository } from "../repositories/health.repository";
import { HealthService } from "./health.service";

describe('HealthService', () => {
	let healthService: HealthService;
	let healthRepository: IHealthRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				HealthService,
				{
					provide: RepositoryNameEnum.HEALTH_REPOSITORY,
					useClass: HealthInMemoryRepository
				}
			],
		}).compile();

		healthService = module.get<HealthService>(HealthService);
		healthRepository = module.get<IHealthRepository>(RepositoryNameEnum.HEALTH_REPOSITORY);
	});

	it('should be defined', () => {
		expect(healthService).toBeDefined();
	});

	it('should return the health application status', async () => {
		const healthResponse = await healthService.getInfo();
		expect(healthResponse).toEqual({
			database: {
				read: expect.any(String),
				write: expect.any(String),
			},
			api: {
				memory: expect.any(String),
				lastCronExecution: expect.any(String),
				onlineTime: expect.any(String),
			},
		});
	});
});
