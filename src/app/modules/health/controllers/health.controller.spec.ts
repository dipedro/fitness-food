import { HealthInMemoryRepository } from "@databases/in-memory/repositories/health.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { RepositoryNameEnum } from "@shared/enums";
import { HealthService } from "../services/health.service";
import { HealthController } from "./health.controller";

describe('HealthController', () => {
	let healthController: HealthController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [HealthController],
			providers: [
				HealthService,
				{
					provide: RepositoryNameEnum.HEALTH_REPOSITORY,
					useClass: HealthInMemoryRepository
				}
			],
		})
		.compile();

		healthController = app.get<HealthController>(HealthController);
	});

	it('should be defined', () => {
		expect(healthController).toBeDefined();
	});

	it('should return the health application status', () => {
		expect(healthController.getHealth()).resolves.toEqual({
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
