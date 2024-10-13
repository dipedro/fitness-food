import { Inject, Injectable } from '@nestjs/common';
import { RepositoryNameEnum } from '../../../shared/enums';
import { HealthResponseDto } from '../dtos/health-response.dto';
import { IHealthRepository } from '../repositories/health.repository';

@Injectable()
export class HealthService {

  constructor(
    @Inject(RepositoryNameEnum.HEALTH_REPOSITORY)
    private readonly healthRepository: IHealthRepository,
  ) {}

  async getInfo(): Promise<HealthResponseDto> {

    const memoryUsage = process.memoryUsage();
    const memoryUsageInMB = memoryUsage.heapUsed / 1024 / 1024;
    const memoryUsageInMBFormatted = `${memoryUsageInMB.toFixed(2)} MB`;
    const uptimeInSeconds = `${Math.floor(process.uptime())} seconds`;
     
    return {
      database: {
        read: await this.healthRepository.getReadStatus(),
        write: await this.healthRepository.getWriteStatus(),
      },
      api: {
        memory: memoryUsageInMBFormatted,
        lastCronExecution: '2024-10-12T00:00:00Z', // TODO: Implement cron job
        onlineTime: uptimeInSeconds,
      },
    }
  }
}
