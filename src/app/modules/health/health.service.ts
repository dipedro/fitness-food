import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dtos/health-response.dto';

@Injectable()
export class HealthService {

  async getInfo(): Promise<HealthResponseDto> {

    const memoryUsage = process.memoryUsage();
    const memoryUsageInMB = memoryUsage.heapUsed / 1024 / 1024;
    const memoryUsageInMBFormatted = `${memoryUsageInMB.toFixed(2)} MB`;
    const uptimeInSeconds = `${Math.floor(process.uptime())} seconds`;
     
    return {
      database: {
        read: 'ok', // TODO: Implement database connection
        write: 'ok', // TODO: Implement database connection
      },
      api: {
        memory: memoryUsageInMBFormatted,
        lastCronExecution: '2024-10-12T00:00:00Z', // TODO: Implement cron job
        onlineTime: uptimeInSeconds,
      },
    }
  }
}
