import { Controller, Get } from '@nestjs/common';
import { HealthResponseDto } from '../dtos/health-response.dto';
import { HealthService } from '../services/health.service';


@Controller()
export class HealthController {
  constructor(
    private readonly healthService: HealthService
  ) {}

  @Get()
  async getHealth(): Promise<HealthResponseDto> {
    return this.healthService.getInfo();
  }
}
