import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('Health', () => {
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
});
