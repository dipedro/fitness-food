import { Inject, Injectable } from '@nestjs/common';
import { RepositoryNameEnum } from '../../../shared/enums';
import { HealthResponseDto } from '../dtos/health-response.dto';
import { IHealthCronHistoryRepository } from '../repositories/health-cron-history.repository';
import { IHealthRepository } from '../repositories/health.repository';

@Injectable()
export class HealthService {

  constructor(
    @Inject(RepositoryNameEnum.HEALTH_REPOSITORY)
    private readonly healthRepository: IHealthRepository,
    @Inject(RepositoryNameEnum.HEALTH_CRON_HISTORY_REPOSITORY)
    private readonly healthCronHistoryRepository: IHealthCronHistoryRepository
  ) {}

  async getInfo(): Promise<HealthResponseDto> {

    const memoryUsage = process.memoryUsage();
    const memoryUsageInMB = memoryUsage.heapUsed / 1024 / 1024;
    const memoryUsageInMBFormatted = `${memoryUsageInMB.toFixed(2)} MB`;
    const uptimeInSeconds = `${Math.floor(process.uptime())} seconds`;

    const lastCronExecution = await this.healthCronHistoryRepository.findLastImportedAt();

    const formattedLastCronExecution = lastCronExecution.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
     
    return {
      database: {
        read: await this.healthRepository.getReadStatus(),
        write: await this.healthRepository.getWriteStatus(),
      },
      api: {
        memory: memoryUsageInMBFormatted,
        lastCronExecution: formattedLastCronExecution,
        onlineTime: uptimeInSeconds,
      },
    }
  }
}
